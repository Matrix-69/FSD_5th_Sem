import React from 'react'
import Button from 'react-bootstrap/Button';

const Wishmefn = (props) => {
  const [count, setCount] = useState(0);
  const increasevalue = () => {
    setCount(count + 1);
  }
  const decreasevalue = () => {
    setCount(count - 1);
  }
  return (
    <div>
      <Wishme un={props.un} />
      <Button onClick={increasevalue}>Increase</Button>
      <Button onClick={decreasevalue}>Decrease</Button>
    </div>
  )
}

export default Wishmefn;
