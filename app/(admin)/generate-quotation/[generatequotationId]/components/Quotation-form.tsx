'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Voucher } from '@prisma/client';

// import { ToastContainer, toast } from 'react-toastify';
import { toast } from 'sonner';
// import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from '@/components/ui/button';

import { Pencil, TrashIcon, XIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import PreviewQuotation from './preview-quotation';

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
  quotationDate: string;
  setQuotationDate: React.Dispatch<React.SetStateAction<string>>;
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
  vat: number;
  taxableAmount: number;
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
  const [quotationDate, setQuotationDate] = useState('');
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

  const [previewQuotation, setPreviewQuotation] = useState(false);

  const [vat, setVat] = useState(0);
  const [taxableAmount, setTaxableAmount] = useState(0);

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

    const vatAmount = sum * 0.05;
    setVat(vatAmount);
    setTaxableAmount(sum + vatAmount);
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
    quotationDate,
    setQuotationDate,
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
    vat,
    taxableAmount,
  };

  return (
    <>
      <section className="pl-10 pr-10 px-4 mt-8 lg:grid lg:grid-cols-1 gap-8">
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput = document.getElementById('email');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput = document.getElementById('address');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput =
                          document.getElementById('phone-number');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>
                    Your physical address, company address, street name, or
                    City.
                  </small>
                </article>

                <article className="article">
                  <label htmlFor="phone-number">Phone number</label>
                  <Input
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput = document.getElementById('bank-name');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>Your active phone number.</small>
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput = document.getElementById(
                          'bank-account-number'
                        );
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>Your bank name</small>
                </article>

                <article className="article">
                  <label htmlFor="bank-account-number">
                    Bank account number
                  </label>
                  <Input
                    type="text"
                    name="bank-account-number"
                    id="bank-account-number"
                    placeholder="Bank account number"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput =
                          document.getElementById('client-name');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>Your bank account number</small>
                </article>
              </div>
            </div>

            <h2 className="text-slate-900 font-bold text-xl my-8">
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput =
                          document.getElementById('client-email');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>Client official name, or company name.</small>
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput =
                          document.getElementById('client-address');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>Client email is optional.</small>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="client-address">
                    Client Physical / Company address
                  </label>
                  <Input
                    type="text"
                    name="client-address"
                    id="client-address"
                    placeholder="Client address"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput =
                          document.getElementById('quotation-date');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>
                    Client physical address, company address, street name, or
                    City.
                  </small>
                </article>

                <article className="article">
                  <label htmlFor="quotation-date">Quotation date</label>
                  <Input
                    type="date"
                    name="quotation-date"
                    id="quotation-date"
                    placeholder="Quotation date"
                    value={quotationDate}
                    onChange={(e) => setQuotationDate(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput = document.getElementById('due-date');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>Date the quotation was created.</small>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="due-date">Due date</label>
                  <Input
                    type="date"
                    name="due-date"
                    id="due-date"
                    placeholder="Due date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput =
                          document.getElementById('item-description');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>Date the quotation is due.</small>
                </article>
              </div>
            </div>

            <h2 className="text-slate-900 font-bold text-xl my-8">
              Item descriptions
            </h2>

            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="item-description">Item description</label>
                  <Input
                    type="text"
                    name="item-description"
                    id="item-description"
                    placeholder="Item description"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput = document.getElementById('quantity');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>Enter the item name or description.</small>
                </article>

                <article className="article">
                  <label htmlFor="quantity">Quantity</label>
                  <Input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(+e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const nextInput = document.getElementById('price');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  />
                  <small>Enter the quantity.</small>
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
                    onChange={(e) => setPrice(+e.target.value)}
                  />
                  <small>Enter the price or rate per itemx.</small>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="total">Total</label>
                  <Input
                    type="number"
                    name="total"
                    id="total"
                    placeholder="Total"
                    readOnly
                    value={total}
                    onChange={(e) => setTotal(+e.target.value)}
                  />
                  <small>Total amount for the item/service.</small>
                </article>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-8">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 transition text-white px-4 py-2 rounded-md"
              >
                Add Item
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel Editing
                </Button>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-slate-900 font-bold text-xl mb-8">
                Items List
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        SI No.
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        Item
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {index + 1}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {item.item}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {item.quantity}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {item.price}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {item.total}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Pencil />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2 gap-14">
              <div className="mt-8">
                <h2 className="text-slate-900 font-bold text-xl mb-8">
                  Additional Notes
                </h2>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="mt-8 border-t pt-4">
                <h2 className="text-slate-900 font-bold text-xl mb-4">
                  Summary
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p>{totalAmount}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>VAT (5%):</p>
                    <p>{vat.toFixed(3)}</p>
                  </div>
                  <div className="flex justify-between font-bold">
                    <p>Total Amount:</p>
                    <p>{taxableAmount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                className="bg-green-600 hover:bg-green-500 transition text-white px-4 py-2 rounded-md"
                size="lg"
                onClick={() => setPreviewQuotation(true)}
              >
                Preview Quotation
              </Button>
            </div>
          </form>
        </div>

        {previewQuotation && (
          <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full h-full max-h-[80%] max-w-[80%] mx-auto relative overflow-auto">
              <Button
                variant="secondary"
                className="absolute top-4 right-4"
                onClick={() => setPreviewQuotation(false)}
              >
                <XIcon className="w-4 h-4" />
              </Button>
              <PreviewQuotation values={values} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};
