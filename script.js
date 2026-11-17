async function shortenLink() {
    const input = document.getElementById('urlInput').value.trim();
    const result = document.getElementById('shortResult');
    
    if (!input) {
        result.style.display = 'block';
        result.innerHTML = '⚠️ Masukkan link dulu bro!';
        result.style.color = '#e74c3c';
        return;
    }

    try {
        const res = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(input)}`);
        const data = await res.json();
        
        if (data.shorturl) {
            result.style.display = 'block';
            result.style.color = '#28a745';
            result.innerHTML = `✅ Berhasil!<br><strong>${data.shorturl}</strong><br><small>Tahan → Salin link</small>`;
        }
    } catch (err) {
        result.style.display = 'block';
        result.style.color = '#e74c3c';
        result.innerHTML = '❌ Coba lagi nanti ya';
    }
}

let files = JSON.parse(localStorage.getItem('myFiles') || '[]');

function renderFileList() {
    const list = document.getElementById('fileList');
    if (files.length === 0) {
        list.innerHTML = '<p class="empty">Belum ada file</p>';
        return;
    }
    list.innerHTML = files.map((file, index) => `
        <div class="file-item">
            <span class="file-name">📄 ${file.name}</span>
            <div>
                <a href="${file.url}" target="_blank" rel="noopener">
                    <button class="download-btn">⬇️ Download</button>
                </a>
                <button class="delete-btn" onclick="deleteFile(${index})">✕</button>
            </div>
        </div>
    `).join('');
}

function addDownload() {
    const link = document.getElementById('fileLink').value.trim();
    const name = document.getElementById('fileName').value.trim() || 'File Tanpa Nama';

    if (!link) {
        alert('Masukkan link dulu bro!');
        return;
    }

    files.push({ name, url: link });
    localStorage.setItem('myFiles', JSON.stringify(files));
    
    document.getElementById('fileLink').value = '';
    document.getElementById('fileName').value = '';
    
    renderFileList();
    alert('✅ Berhasil ditambahkan!');
}

function deleteFile(index) {
    files.splice(index, 1);
    localStorage.setItem('myFiles', JSON.stringify(files));
    renderFileList();
}

renderFileList();
      
