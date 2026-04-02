# swing_trend_signal.py
import yfinance as yf
import pandas as pd
import numpy as np
from ta.trend import EMAIndicator, MACD, ADXIndicator
from ta.momentum import RSIIndicator
from ta.volatility import BollingerBands, AverageTrueRange

# ---------- Supertrend Implementation ----------
def supertrend(df, period=10, multiplier=3.0):
    """
    Add Supertrend columns to df (must have ['high','low','close']).
    Returns DataFrame with 'supertrend' column (True for bullish, False for bearish)
    and 'supertrend_band' (float level).
    """
    high = df['High']
    low = df['Low']
    close = df['Close']

    atr = AverageTrueRange(high=high, low=low, close=close, window=period).average_true_range()
    hl2 = (high + low) / 2

    final_upperband = hl2 + (multiplier * atr)
    final_lowerband = hl2 - (multiplier * atr)

    supertrend = [True] * len(df)  # placeholder
    supertrend_band = [np.nan] * len(df)
    # states
    for i in range(len(df)):
        if i == 0:
            supertrend[i] = True
            supertrend_band[i] = final_lowerband.iat[i]
            continue
        curr_close = close.iat[i]
        prev_close = close.iat[i-1]

        # initialize
        ub = final_upperband.iat[i]
        lb = final_lowerband.iat[i]

        prev_ub = final_upperband.iat[i-1]
        prev_lb = final_lowerband.iat[i-1]

        # carry over bands to avoid sudden flips
        if ub < prev_ub:
            ub = prev_ub
        if lb > prev_lb:
            lb = prev_lb

        # decide direction
        if supertrend[i-1] and curr_close <= ub:
            # switch to bearish
            supertrend[i] = False
            supertrend_band[i] = ub
        elif (not supertrend[i-1]) and curr_close >= lb:
            # switch to bullish
            supertrend[i] = True
            supertrend_band[i] = lb
        else:
            # keep previous direction and band
            supertrend[i] = supertrend[i-1]
            supertrend_band[i] = supertrend_band[i-1]

    df = df.copy()
    df['supertrend'] = supertrend
    df['supertrend_band'] = supertrend_band
    return df

# ---------- Signal Engine ----------
def compute_indicators(df):
    df = df.copy()
    df.index = pd.to_datetime(df.index)

    # EMAs
    df['ema9'] = EMAIndicator(close=df['Close'], window=9).ema_indicator()
    df['ema26'] = EMAIndicator(close=df['Close'], window=26).ema_indicator()
    df['ema50'] = EMAIndicator(close=df['Close'], window=50).ema_indicator()

    # MACD
    macd = MACD(close=df['Close'], window_slow=26, window_fast=12, window_sign=9)
    df['macd'] = macd.macd()
    df['macd_signal'] = macd.macd_signal()
    df['macd_hist'] = macd.macd_diff()

    # RSI
    df['rsi14'] = RSIIndicator(close=df['Close'], window=14).rsi()

    # Bollinger Bands (20,2)
    bb = BollingerBands(close=df['Close'], window=20, window_dev=2)
    df['bb_mid'] = bb.bollinger_mavg()
    df['bb_upper'] = bb.bollinger_hband()
    df['bb_lower'] = bb.bollinger_lband()
    df['bb_width'] = (df['bb_upper'] - df['bb_lower']) / df['bb_mid']

    # ADX and +DI / -DI
    adx = ADXIndicator(high=df['High'], low=df['Low'], close=df['Close'], window=14)
    df['adx'] = adx.adx()
    df['pdi'] = adx.adx_pos()
    df['mdi'] = adx.adx_neg()

    # ATR
    df['atr14'] = AverageTrueRange(high=df['High'], low=df['Low'], close=df['Close'], window=14).average_true_range()

    # VWAP-ish (daily cumulative approximation)
    typical = (df['High'] + df['Low'] + df['Close']) / 3
    df['tpv'] = typical * df['Volume']
    df['cum_tpv'] = df['tpv'].cumsum()
    df['cum_vol'] = df['Volume'].cumsum().replace(0, np.nan)
    df['vwap_like'] = df['cum_tpv'] / df['cum_vol']

    # Supertrend
    df = supertrend(df, period=10, multiplier=3.0)

    return df

def make_swing_signal(df):
    """
    Evaluate the most recent row and return:
    (signal_str, dict_of_reasons, suggested_stoploss)
    """
    latest = df.iloc[-1]
    prev = df.iloc[-2]

    reasons = []
    bullish_votes = 0
    bearish_votes = 0

    # Rule 1: Price vs ema50
    if latest['Close'] > latest['ema50']:
        bullish_votes += 1
        reasons.append("Price above EMA50")
    else:
        bearish_votes += 1
        reasons.append("Price below EMA50")

    # Rule 2: EMA crossover (9 over 26)
    if latest['ema9'] > latest['ema26']:
        bullish_votes += 1
        reasons.append("EMA9 > EMA26")
    else:
        bearish_votes += 1
        reasons.append("EMA9 <= EMA26")

    # Rule 3: MACD histogram positive and rising
    if latest['macd_hist'] > 0 and latest['macd_hist'] > prev['macd_hist']:
        bullish_votes += 1
        reasons.append("MACD hist positive & rising")
    elif latest['macd_hist'] < 0 and latest['macd_hist'] < prev['macd_hist']:
        bearish_votes += 1
        reasons.append("MACD hist negative & falling")
    else:
        reasons.append("MACD hist neutral")

    # Rule 4: RSI (momentum)
    if latest['rsi14'] >= 50 and latest['rsi14'] <= 70 and latest['rsi14'] > prev['rsi14']:
        bullish_votes += 1
        reasons.append(f"RSI {latest['rsi14']:.1f} rising in bullish range")
    elif latest['rsi14'] < 45:
        bearish_votes += 1
        reasons.append(f"RSI {latest['rsi14']:.1f} weak")
    else:
        reasons.append(f"RSI {latest['rsi14']:.1f} neutral")

    # Rule 5: Bollinger position
    if latest['Close'] > latest['bb_upper']:
        bullish_votes += 1
        reasons.append("Close above BB upper (strong momentum)")
    elif latest['Close'] < latest['bb_lower']:
        bearish_votes += 1
        reasons.append("Close below BB lower (downside momentum)")
    elif latest['Close'] > latest['bb_mid']:
        reasons.append("Close above BB mid")
        bullish_votes += 0.5  # slight bullish
    else:
        reasons.append("Close below BB mid")
        bearish_votes += 0.5  # slight bearish

    # Rule 6: ADX (trend strength) and DI
    if latest['adx'] >= 20:
        if latest['pdi'] > latest['mdi']:
            bullish_votes += 1
            reasons.append(f"ADX {latest['adx']:.1f} & +DI>{latest['mdi']:.1f}")
        else:
            bearish_votes += 1
            reasons.append(f"ADX {latest['adx']:.1f} & -DI>{latest['pdi']:.1f}")
    else:
        reasons.append(f"ADX {latest['adx']:.1f} weak (no strong trend)")

    # Rule 7: Supertrend
    if latest['supertrend'] is True:
        bullish_votes += 1
        reasons.append("Supertrend bullish")
    else:
        bearish_votes += 1
        reasons.append("Supertrend bearish")

    # VWAP-like: price above vwap-like is mild bullish
    if latest['Close'] > latest['vwap_like']:
        bullish_votes += 0.5
        reasons.append("Price above VWAP-like")
    else:
        bearish_votes += 0.5
        reasons.append("Price below VWAP-like")

    # Aggregate
    score = bullish_votes - bearish_votes

    # Stop-loss suggestion: use max(lower Bollinger, close - 1.5*ATR)
    stoploss_atr = latest['Close'] - 1.5 * latest['atr14']
    stoploss_bb = latest['bb_lower']
    suggested_stop = min(stoploss_atr, stoploss_bb)

    # final signal thresholds (tunable)
    if score >= 2.0:
        signal = "UPTREND"
    elif score <= -2.0:
        signal = "DOWNTREND"
    else:
        signal = "NEUTRAL"

    extras = {
        'score': round(score, 2),
        'bullish_votes': bullish_votes,
        'bearish_votes': bearish_votes,
        'suggested_stoploss': float(suggested_stop),
        'close': float(latest['Close']),
        'date': latest.name
    }

    return signal, reasons, extras

# ---------- Example Usage ----------
if __name__ == "__main__":
    # CONFIG
    symbol = "RELIANCE.NS"   # example: use NSE symbols with '.NS' (India). Change as needed.
    period = "1y"            # historical window (1y, 6mo, etc.)
    interval = "1d"         # daily for swing trades

    # Fetch data
    df = yf.download(symbol, period=period, interval=interval, auto_adjust=False, progress=False)
    if df.empty:
        raise SystemExit(f"No data fetched for {symbol} — check symbol and network.")

    # Ensure columns capitalization match functions
    df.rename(columns=str.title, inplace=True)  # make 'Open','High','Low','Close','Volume'

    df_ind = compute_indicators(df)

    # Optionally save indicators to csv for backtest / review
    # df_ind.to_csv(f"{symbol.replace('.','_')}_indicators.csv")

    # Produce signal
    signal, reasons, extras = make_swing_signal(df_ind)
    print("Symbol:", symbol)
    print("Date:", extras['date'])
    print("Close:", round(extras['close'], 2))
    print("Signal:", signal)
    print("Score:", extras['score'])
    print("Suggested stoploss:", round(extras['suggested_stoploss'], 2))
    print("\nTriggered rules/explanations:")
    for r in reasons:
        print("-", r)

    # show last few rows of indicators (optional)
    print("\nLast 3 rows (Close, ema50, macd_hist, rsi14, adx, supertrend):")
    print(df_ind[['Close','ema50','macd_hist','rsi14','adx','supertrend']].tail(3).round(3))
