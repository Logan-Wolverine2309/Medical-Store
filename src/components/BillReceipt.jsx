import React, { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { FaPrint, FaArrowLeft } from 'react-icons/fa'

const BillReceipt = () => {
  const { id } = useParams()
  const { bills } = useStore()
  const receiptRef = useRef()

  const bill = bills.find(b => b.id === parseInt(id))

  if (!bill) {
    return (
      <div className="no-data">
        <h2>Bill not found!</h2>
        <Link to="/billing" className="btn btn-primary">Go to Billing</Link>
      </div>
    )
  }

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML
    const newWindow = window.open('', '_blank')
    newWindow.document.write(`
      <html>
        <head>
          <title>Bill Receipt - ${bill.billNo}</title>
          <style>
            body { font-family: 'Courier New', monospace; max-width: 400px; margin: 0 auto; padding: 20px; }
            .receipt-header { text-align: center; border-bottom: 2px dashed #333; padding-bottom: 10px; }
            .receipt-header h1 { font-size: 24px; margin: 0; }
            .receipt-header p { margin: 2px 0; font-size: 12px; }
            .receipt-info { margin: 15px 0; font-size: 13px; }
            .receipt-info div { display: flex; justify-content: space-between; margin: 3px 0; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px; }
            th, td { padding: 5px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #f5f5f5; }
            .receipt-total { border-top: 2px dashed #333; padding-top: 10px; margin-top: 10px; }
            .receipt-total div { display: flex; justify-content: space-between; margin: 5px 0; font-size: 14px; }
            .grand-total { font-size: 18px !important; font-weight: bold; border-top: 1px solid #333; padding-top: 5px; }
            .receipt-footer { text-align: center; margin-top: 20px; border-top: 2px dashed #333; padding-top: 10px; font-size: 12px; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `)
    newWindow.document.close()
    newWindow.print()
  }

  return (
    <div className="receipt-page">
      <div className="page-header">
        <h1>🧾 Bill Receipt</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handlePrint}><FaPrint /> Print Receipt</button>
          <Link to="/billing" className="btn btn-secondary"><FaArrowLeft /> Back to Billing</Link>
        </div>
      </div>

      <div className="receipt-container" ref={receiptRef}>
        <div className="receipt-header">
          <h1>💊 MedStore Pro</h1>
          <p>123 Health Street, Medical Complex</p>
          <p>Phone: +91 9876543210 | GST: 27AABCU9603R1ZN</p>
          <p>━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
          <p><strong>TAX INVOICE</strong></p>
        </div>

        <div className="receipt-info">
          <div><span>Bill No:</span><span>{bill.billNo}</span></div>
          <div><span>Date:</span><span>{bill.date}</span></div>
          <div><span>Customer:</span><span>{bill.customerName}</span></div>
          {bill.customerPhone && <div><span>Phone:</span><span>{bill.customerPhone}</span></div>}
          <div><span>Payment:</span><span>{bill.paymentMethod}</span></div>
        </div>

        <table>
          <thead><tr><th>#</th><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
          <tbody>
            {bill.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td><td>{item.name}</td><td>{item.quantity}</td>
                <td>₹{item.price.toFixed(2)}</td><td>₹{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="receipt-total">
          <div><span>Subtotal:</span><span>₹{bill.subtotal.toFixed(2)}</span></div>
          <div><span>Discount ({bill.discount}%):</span><span>-₹{(bill.discountAmount || 0).toFixed(2)}</span></div>
          <div><span>GST (5%):</span><span>₹{bill.tax.toFixed(2)}</span></div>
          <div className="grand-total"><span>GRAND TOTAL:</span><span>₹{bill.grandTotal.toFixed(2)}</span></div>
        </div>

        <div className="receipt-footer">
          <p>━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
          <p>Thank you for your purchase!</p>
          <p>Get well soon! 🙏</p>
        </div>
      </div>
    </div>
  )
}

export default BillReceipt