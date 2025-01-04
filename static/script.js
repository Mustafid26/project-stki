document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const query = document.getElementById('query').value;
    const response = await fetch('/search-reff', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query })
    });
    
    const results = await response.json();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    // Create and append the heading just once
    const heading = document.createElement("h2");
    heading.className = "mb-2 text-lg font-semibold text-center";
    heading.textContent = "Mungkin ini yang anda cari:";
    resultsDiv.appendChild(heading);
    
    // Create the table structure
    const tableContainer = document.createElement('div');
    tableContainer.className = "relative overflow-x-auto rounded-md";
    
    const table = document.createElement('table');
    table.className = "w-full border-solid text-center";
    table.innerHTML = `
        <thead>
            <tr>
                <td class="font-medium">Judul</td>
                <td class="font-medium">Artist</td>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    
    // Append the table to the container
    tableContainer.appendChild(table);
    resultsDiv.appendChild(tableContainer);
    
    // Get the tbody element to append rows
    const tbody = table.querySelector('tbody');
    
    // Iterate through results and create a row for each song
    results.forEach(result => {
        const row = document.createElement('tr');
        row.className = "bg-white border-b";
    
        // Create cells for each piece of data
        const titleCell = document.createElement('td');
        titleCell.scope = "row";
        titleCell.className = "whitespace-nowrap";
        titleCell.textContent = result.judul;
    
        const artistCell = document.createElement('td');
        artistCell.className = "";
        artistCell.textContent = result.artist;
    
        // Append cells to the row
        row.appendChild(titleCell);
        row.appendChild(artistCell);
        
        // Append the row to the tbody
        tbody.appendChild(row);
    });
});