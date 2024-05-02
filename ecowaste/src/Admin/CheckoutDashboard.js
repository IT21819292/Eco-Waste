import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CheckoutApi from '../Api/CheckoutApi';
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import backgroundImage from '../images/bg8.jpg';

function CheckoutDashboard() {
    const [checkouts, setCheckouts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCheckouts();
    }, []);

    const fetchCheckouts = () => {
        CheckoutApi.getAllProductApi()
            .then(data => {
                setCheckouts(data.existingCheckouts);
            })
            .catch(error => {
                console.error("Error fetching checkouts:", error);
            });
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        if (event.target.value === "") {
            fetchCheckouts();  // Reset to all checkouts if search is cleared
        } else {
            setCheckouts(checkouts.filter(checkout => 
                checkout.itemName.toLowerCase().includes(event.target.value.toLowerCase())
                || checkout.userName.toLowerCase().includes(event.target.value.toLowerCase())
            ));
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                CheckoutApi.deleteCheckoutApi(id)
                    .then(response => {
                    // Update state or refetch the list
                    fetchCheckouts();
                    console.log("Checkout deleted successfully:", response);
                })
                .catch(error => {
                    console.error("Error deleting checkout:", error);
                });
            }
        });
    };

    const handleRefundToggle = (id, currentStatus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to change the refund status?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                CheckoutApi.updateCheckoutApi(id, { isRefund: !currentStatus })
                    .then(response => {
                        fetchCheckouts(); // Update state or refetch the list
                        console.log("Checkout updated successfully:", response);
                    })
                    .catch(error => {
                        console.error("Error updating checkout:", error);
                    });
            }
        });
    };

    const handleGenerateReport = () => {
        const doc = new jsPDF();
      
        // Document title and metadata
        const reportTitle = "Order List Report";
        const contactDetails = {
          email: "ecowaste@s.com",
          tel: "+94 76 333 2222",
          address: "No 45/c, Kandy Road, Malabe"
        };
        const today = new Date();
        const dateFormatted = today.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      
        // Setting up the document
        doc.setFont("helvetica");
        doc.setTextColor("#000000");
        doc.setFontSize(22);
        doc.text(reportTitle, 10, 20);
      
        // Generated date
        doc.setFontSize(10);
        doc.setTextColor("#333333");
        doc.text(`Generated on: ${dateFormatted}`, 5, 10);
      
        // Contact Details
        doc.setFontSize(12);
        doc.setTextColor("#000000");
        doc.text("Contact Us:", 14, 40);
        doc.setFontSize(10);
        doc.setTextColor("#555555");
        doc.text(`Tel: ${contactDetails.tel}`, 14, 45);
        doc.text(`Email: ${contactDetails.email}`, 14, 50);
        doc.text(`Address: ${contactDetails.address}`, 14, 55);
        doc.setDrawColor("#dddddd");
        doc.line(14, 70, 198, 70); // Drawing a line for separation
      
        // Define the columns
        const tableColumn = ["Date","User Name", "Item", "Quantity", "item Price", "payement Status"];
        // Assuming 'users' is already defined and loaded with data
        const tableRows = checkouts.map(item=> [
        item.date,
          item.userName,
          item.itemName,
          item.quantity,
          item.itemPrice,
          item.isPayment ? "Done" : "Pending",
          // Note: Excluding the image URL from the table for clarity
        ]);
      
        // Add table to the PDF
        doc.autoTable(tableColumn, tableRows, {
          startY: 65,
          theme: "striped",
          styles: { fontSize: 9, cellPadding: 4, overflow: 'linebreak' },
          columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 30 },
            2: { cellWidth: 30 },
            3: { cellWidth: 30 },
            4: { cellWidth: 30 },
            4: { cellWidth: 30 }
          },
          headStyles: { fillColor: [22, 160, 133], textColor: '#FFFFFF', fontStyle: 'bold' },
          margin: { horizontal: 14 },
          bodyStyles: { valign: 'top' },
          showHead: 'everyPage',
          pageBreak: 'auto'
        });
      
        // Save the PDF with a formatted filename
        const fileName = `order-list-report-${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}.pdf`;
        doc.save(fileName);
      };

    return (
    <div className="vh-120 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="card p-4" 
        style={{ width: '90vw',padding:'10px' ,alignSelf:'center',marginTop:'5vw', marginBottom:'5vw',padding:'5vw'}}>
            <h2 className="mb-3">Checkout Admin Dashboard</h2>
            <div className="d-flex justify-content-between mb-2">
                <Form.Control
                    type="text"
                    placeholder="Search by user or item name"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: '40%' }}
                />
                <Button onClick={handleGenerateReport}>Generate Report</Button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Item Name</th>
                        <th>Date</th>
                        <th>Return Type</th>
                        <th>Quantity</th>
                        <th>Is Payment</th>
                        <th>Total Amount</th>
                        <th>Refund</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {checkouts.map((item) => (
                        <tr key={item._id}>
                            <td>{item.userName}</td>
                            <td>{item.itemName}</td>
                            <td>{item.date}</td>
                            <td>{item.rType}</td>
                            <td>{item.quantity}</td>
                            <td>{item.isPayment ? "Yes" : "No"}</td>
                            <td>{item.totalAmount}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleRefundToggle(item._id, item.isRefund)}>{item.isRefund ? "Undo Refund" : "Refund"}</Button>{' '}
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </div>
    );
}

export default CheckoutDashboard;
