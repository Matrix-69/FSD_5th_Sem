import React from 'react';

const products = [
  { id: 1, name: 'Handmade Vase', price: '₹499' },
  { id: 2, name: 'Wool Scarf', price: '₹799' }
];

export default function ProductList() {
  return (
    <div>
      <h2>Crafts for Sale</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - <strong>{p.price}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
