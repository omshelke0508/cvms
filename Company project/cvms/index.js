let visitorRecords = [];

function addVisitor(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('visitorName').value;
    const purpose = document.getElementById('purpose').value;
    const date = document.getElementById('visitDate').value;
    const time = document.getElementById('visitTime').value;
    const meetingPerson = document.getElementById('meetingPerson').value;

    // Create a new visitor object
    const visitor = {
        name,
        purpose,
        date,
        time,
        meetingPerson
    };

    // Add to records array
    visitorRecords.push(visitor);

    // Update the table
    displayRecords();
}

function displayRecords() {
    const tableBody = document.getElementById('visitorRecords').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear current records

    visitorRecords.forEach(visitor => {
        const row = tableBody.insertRow();

        row.insertCell(0).innerText = visitor.name;
        row.insertCell(1).innerText = visitor.purpose;
        row.insertCell(2).innerText = visitor.date;
        row.insertCell(3).innerText = visitor.time;
        row.insertCell(4).innerText = visitor.meetingPerson;

        // Add "Print Pass" button
        const printButton = row.insertCell(5);
        const button = document.createElement("button");
        button.innerText = "Print Pass";
        button.onclick = () => printPass(visitor);
        printButton.appendChild(button);
    });
}

function printPass(visitor) {
    const passContent = `
        <html>
        <head>
            <title>Visitor Pass</title>
            <style>
                body { font-family: Arial, sans-serif; }
                .pass-container { width: 300px; border: 1px solid #000; padding: 20px; text-align: center; }
                .pass-container h3 { margin-bottom: 20px; }
                .pass-container p { margin: 5px 0; }
                .pass-container .highlight { font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="pass-container">
                <h3>Visitor Pass</h3>
                <p><span class="highlight">Visitor Name:</span> ${visitor.name}</p>
                <p><span class="highlight">Purpose:</span> ${visitor.purpose}</p>
                <p><span class="highlight">Date:</span> ${visitor.date}</p>
                <p><span class="highlight">Time:</span> ${visitor.time}</p>
                <p><span class="highlight">Meeting With:</span> ${visitor.meetingPerson}</p>
                <p><span class="highlight">Issued On:</span> ${new Date().toLocaleString()}</p>
            </div>
        </body>
        </html>
    `;

    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write(passContent);
    printWindow.document.close(); // Close the document to ensure it finishes loading
    printWindow.print(); // Open the print dialog
}

// Download as PDF (Using jsPDF library)
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set title
    doc.text("Visitor Records", 14, 16);

    // Add table rows (simple format for demo)
    visitorRecords.forEach((visitor, index) => {
        doc.text(`${index + 1}. ${visitor.name}, ${visitor.purpose}, ${visitor.date}, ${visitor.time}, ${visitor.meetingPerson}`, 14, 20 + (index * 10));
    });

    doc.save('visitor_records.pdf');
}
