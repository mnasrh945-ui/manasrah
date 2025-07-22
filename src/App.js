import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'سكر', quantity: 10, price: 5, image: null },
    { id: 2, name: 'زيت', quantity: 5, price: 15, image: null },
    { id: 3, name: 'شاي', quantity: 8, price: 8, image: null },
    { id: 4, name: 'أرز', quantity: 12, price: 12, image: null },
    { id: 5, name: 'مكرونة', quantity: 7, price: 6, image: null },
    { id: 6, name: 'ملح', quantity: 15, price: 2, image: null },
    { id: 7, name: 'حليب', quantity: 9, price: 7, image: null },
    { id: 8, name: 'جبن', quantity: 6, price: 20, image: null },
    { id: 9, name: 'عصير', quantity: 11, price: 4, image: null },
    { id: 10, name: 'بسكويت', quantity: 13, price: 3, image: null },
  ]);
  const [form, setForm] = useState({ name: '', quantity: '', price: '', image: null, id: null });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.price) return;
    if (editMode) {
      setItems(items.map(item => item.id === form.id ? { ...item, name: form.name, quantity: Number(form.quantity), price: Number(form.price), image: form.image } : item));
      setEditMode(false);
    } else {
      setItems([...items, { id: Date.now(), name: form.name, quantity: Number(form.quantity), price: Number(form.price), image: form.image }]);
    }
    setForm({ name: '', quantity: '', price: '', image: null, id: null });
    document.getElementById('imageInput').value = '';
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    if (editMode && form.id === id) {
      setEditMode(false);
      setForm({ name: '', quantity: '', price: '', image: null, id: null });
    }
  };

  const DEFAULT_IMAGE = "https://img.icons8.com/fluency/48/000000/shopping-basket.png";

  return (
    <div className="App">
      <h1>قائمة المنتجات في السوبرماركت</h1>
      <table style={{ margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', minWidth: 350 }}>
        <thead>
          <tr>
            <th>الصورة</th>
            <th>اسم السلعة</th>
            <th>الكمية</th>
            <th>السعر (₪)</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan="4">لا توجد سلع</td></tr>
          ) : (
            items.map(item => (
              <tr key={item.id}>
                <td>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
                  ) : (
                    <img src={DEFAULT_IMAGE} alt="صورة افتراضية" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee', opacity: 0.6 }} />
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price} ₪</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
