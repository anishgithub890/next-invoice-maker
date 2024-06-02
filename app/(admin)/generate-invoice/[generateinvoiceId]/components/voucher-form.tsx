'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Voucher } from '@prisma/client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from '@/components/ui/button';

import { Pencil, TrashIcon, XIcon } from 'lucide-react';

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

      <section className="lg:pl-72 px-4 mt-8 lg:grid lg:grid-cols-2 gap-8">
        {/* Form */}
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
                  <small>Your phone number or company phone number.</small>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="bankName">Bank name</label>
                  <Input
                    type="text"
                    name="bankName"
                    id="bankName"
                    placeholder="Your bank name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </article>

                <article className="article">
                  <label htmlFor="bankAccountNumber">Bank account number</label>
                  <Input
                    type="text"
                    name="bankAccountNumber"
                    id="bankAccountNumber"
                    placeholder="Your bank account number"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                  />
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="invoice-date">Invoice Date</label>
                  <Input
                    type="date"
                    name="invoice-date"
                    id="invoice-date"
                    placeholder="Invoice date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </article>

                <article className="article">
                  <label htmlFor="due-date">Due Date</label>
                  <Input
                    type="date"
                    name="due-date"
                    id="due-date"
                    placeholder="Invoie due date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </article>
              </div>
            </div>

            {/* Client details */}
            <h2 className="text-slate-900 font-bold text-xl my-8">
              Client details
            </h2>

            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="client-name">Client&apos;s name</label>
                  <Input
                    type="text"
                    name="client-name"
                    id="client-name"
                    placeholder="Client's name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
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
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="client-address">Client&apos;s address</label>
                  <Input
                    type="text"
                    name="client-address"
                    id="client-address"
                    placeholder="Client's address"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                  />
                </article>
              </div>
            </div>

            {/* Item descriptions */}
            <h2 className="text-slate-900 font-bold text-xl my-8">
              Item descriptions
            </h2>

            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="item-name">Item name</label>
                  <Input
                    type="text"
                    name="item-name"
                    id="item-name"
                    placeholder="Item name"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
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

              <div className="grid gap-4 md:grid-cols-2">
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
                </article>

                <article className="article">
                  <label htmlFor="total">Total</label>
                  <div>{total}</div>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="default">Add Item</Button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-4">
                      <p>{item.item}</p>
                      <p>{item.quantity}</p>
                      <p>{item.price}</p>
                    </div>

                    <div>
                      <ul className="flex gap-4">
                        <li>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <TrashIcon />
                          </Button>
                        </li>
                        <li>
                          <Button
                            variant="secondary"
                            onClick={() => handleEdit(item.id)}
                          >
                            <Pencil />
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="narration">Additional notes</label>
                  <Textarea
                    name="narration"
                    id="narration-notes"
                    cols={30}
                    rows={3}
                    placeholder="Important narration the client should know about"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </article>
              </div>
            </div>

            <div className="mt-8 pb-12">
              <Button onClick={() => setPreviewInvoice(true)}>
                Preview Invoice
              </Button>
            </div>
          </form>
        </div>

        {/* Invoice preview */}
        <div>
          <PreviewInvoice values={values} />
        </div>

        {previewInvoice && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/75">
            <div className="max-w-5xl mx-auto">
              <ul className="mt-20 flex items-center justify-between">
                <li>
                  <Button onClick={createPDF} variant="secondary">
                    Download Invoice
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => setPreviewInvoice(false)}
                    variant="secondary"
                  >
                    <XIcon />
                  </Button>
                </li>
              </ul>
              <PreviewInvoice values={values} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};
