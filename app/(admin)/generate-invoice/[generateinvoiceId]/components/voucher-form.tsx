'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Voucher } from '@prisma/client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from '@/components/ui/button';

import { Pencil, TrashIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import PreviewInvoice from './preview-invoice';

interface Item {
  id: string;
  item: string;
  quantity: number;
  price: number;
  total: number;
}

interface Values {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  bankName: string;
  setBankName: React.Dispatch<React.SetStateAction<string>>;
  bankAccountNumber: string;
  setBankAccountNumber: React.Dispatch<React.SetStateAction<string>>;
  invoiceDate: string;
  setInvoiceDate: React.Dispatch<React.SetStateAction<string>>;
  dueDate: string;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
  clientName: string;
  setClientName: React.Dispatch<React.SetStateAction<string>>;
  clientEmail: string;
  setClientEmail: React.Dispatch<React.SetStateAction<string>>;
  clientAddress: string;
  setClientAddress: React.Dispatch<React.SetStateAction<string>>;
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  totalAmount: number;
}

interface VoucherFormProps {
  initialData?: Voucher | null;
}

export const VoucherForm: React.FC<VoucherFormProps> = ({ initialData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [notes, setNotes] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const [previewInvoice, setPreviewInvoice] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!item || !quantity || !price) {
      toast.error('Please fill in all the inputs');
    } else {
      const newItem: Item = {
        id: uuidv4(),
        item,
        quantity,
        price,
        total: quantity * price,
      };
      setItems([newItem, ...items]);
      setItem('');
      setQuantity(0);
      setPrice(0);
      toast.success('New item added');
    }
  }

  function calculateTotal() {
    setTotal(quantity * price);
  }

  useEffect(() => {
    calculateTotal();
  }, [quantity, price]);

  function calculateTotalAmount() {
    const allItems = items.map((item) => item.total);
    const sum = allItems.reduce((acc, curr) => acc + curr, 0);
    setTotalAmount(sum);
  }

  useEffect(() => {
    calculateTotalAmount();
  }, [items]);

  function handleDelete(id: string) {
    setItems(items.filter((row) => row.id !== id));
    toast.error('You have deleted an item');
  }

  function handleEdit(id: string) {
    const editingRow = items.find((row) => row.id === id);
    if (!editingRow) return;

    setItems(items.filter((row) => row.id !== id));
    setIsEditing(true);
    setItem(editingRow.item);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  }

  function createPDF() {
    const invoice = document.getElementById('pdf');
    if (!invoice) return;

    html2canvas(invoice, {
      logging: true,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${clientName}.pdf`);
    });
  }

  const values: Values = {
    name,
    setName,
    email,
    setEmail,
    address,
    setAddress,
    phoneNumber,
    setPhoneNumber,
    bankName,
    setBankName,
    bankAccountNumber,
    setBankAccountNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    clientName,
    setClientName,
    clientEmail,
    setClientEmail,
    clientAddress,
    setClientAddress,
    item,
    setItem,
    quantity,
    setQuantity,
    price,
    setPrice,
    total,
    setTotal,
    items,
    setItems,
    notes,
    setNotes,
    totalAmount,
  };

  return (
    <>
      <ToastContainer theme="colored" />

      <section className="lg:pl-72 px-4 mt-16 lg:grid lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-slate-900 font-bold text-xl mb-8">
              Your details
            </h2>

            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="name">Your name</label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <small>Your official name, or company name.</small>
                </article>

                <article className="article">
                  <label htmlFor="email">Your email</label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small>Your email is optional.</small>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="address">Physical / Company address</label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <small>
                    Your physical address, company address, street name, or
                    City.
                  </small>
                </article>

                <article className="article">
                  <label htmlFor="phone-number">Phone number</label>
                  <Input
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <small>Your phone number.</small>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="bank-name">Bank name</label>
                  <Input
                    type="text"
                    name="bank-name"
                    id="bank-name"
                    placeholder="Bank name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                  <small>Your official Bank name.</small>
                </article>

                <article className="article">
                  <label htmlFor="bank-account">Bank account number</label>
                  <Input
                    type="text"
                    name="bank-account"
                    id="bank-account"
                    placeholder="Bank account number"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                  />
                  <small>Your official Bank account number.</small>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="invoice-date">Invoice date</label>
                  <Input
                    type="date"
                    name="invoice-date"
                    id="invoice-date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                  <small>Choose a date for invoice.</small>
                </article>

                <article className="article">
                  <label htmlFor="due-date">Due date</label>
                  <Input
                    type="date"
                    name="due-date"
                    id="due-date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  <small>Choose a date to collect payment.</small>
                </article>
              </div>
            </div>

            <h2 className="text-slate-900 font-bold text-xl mb-8 mt-16">
              Client details
            </h2>

            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="client-name">Client name</label>
                  <Input
                    type="text"
                    name="client-name"
                    id="client-name"
                    placeholder="Client name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                  <small>Client official name.</small>
                </article>

                <article className="article">
                  <label htmlFor="client-email">Client email</label>
                  <Input
                    type="email"
                    name="client-email"
                    id="client-email"
                    placeholder="Client email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                  <small>Client email is optional.</small>
                </article>
              </div>

              <article className="article">
                <label htmlFor="client-address">Client address</label>
                <Input
                  type="text"
                  name="client-address"
                  id="client-address"
                  placeholder="Client address"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                />
                <small>
                  Client physical address, company address, street name, or
                  City.
                </small>
              </article>
            </div>

            <h2 className="text-slate-900 font-bold text-xl mb-8 mt-16">
              Invoice details
            </h2>

            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="item">Item name</label>
                  <Input
                    type="text"
                    name="item"
                    id="item"
                    placeholder="Item name"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
                  <small>Item name.</small>
                </article>

                <article className="article">
                  <label htmlFor="quantity">Quantity</label>
                  <Input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <small>Quantity.</small>
                </article>
              </div>

              <article className="article">
                <label htmlFor="price">Price</label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <small>Price.</small>
              </article>

              <article className="article">
                <label htmlFor="total">Total</label>
                <Input
                  type="number"
                  name="total"
                  id="total"
                  placeholder="Total"
                  value={total}
                  onChange={(e) => setTotal(Number(e.target.value))}
                  readOnly
                />
                <small>Total amount.</small>
              </article>

              <article className="article">
                <label htmlFor="notes">Notes</label>
                <Textarea
                  name="notes"
                  id="notes"
                  placeholder="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <small>Additional notes (optional).</small>
              </article>
            </div>

            <Button type="submit" className="mt-8">
              {isEditing ? 'Update item' : 'Add item'}
            </Button>
          </form>

          <div className="mt-8">
            <h2 className="text-slate-900 font-bold text-xl mb-4">
              Items ({items.length})
            </h2>

            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2">Item</th>
                  <th className="py-2 px-4 border-b-2">Quantity</th>
                  <th className="py-2 px-4 border-b-2">Price</th>
                  <th className="py-2 px-4 border-b-2">Total</th>
                  <th className="py-2 px-4 border-b-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border-b">{item.item}</td>
                    <td className="py-2 px-4 border-b">{item.quantity}</td>
                    <td className="py-2 px-4 border-b">{item.price}</td>
                    <td className="py-2 px-4 border-b">{item.total}</td>
                    <td className="py-2 px-4 border-b">
                      <Button
                        variant="link"
                        onClick={() => handleEdit(item.id)}
                        className="text-blue-600"
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600"
                      >
                        <TrashIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <PreviewInvoice values={values} />

          <Button onClick={() => createPDF()} className="mt-8">
            Download PDF
          </Button>
        </div>
      </section>
    </>
  );
};
