const trailerMap = {
    Fetih1453: {
        title: 'Fetih 1453',
        embedUrl: 'https://www.youtube.com/embed/QCzsaJghQ5c'
    },
    SangKyai: {
        title: 'Sang Kyai',
        embedUrl: 'https://www.youtube.com/embed/l9v0pzrlb6o'
    },
    SingaPadangPasir: {
        title: 'Singa Padang Pasir',
        embedUrl: 'https://www.youtube.com/embed/s_lpj5k0TnU'
    },
    Tjokroaminoto: {
        title: 'Tjokroaminoto',
        embedUrl: 'https://www.youtube.com/embed/ubpILMZ9yLs'
    }
};

function openTrailer(movieKey) {
    const target = trailerMap[movieKey] ? movieKey : 'Fetih1453';
    window.location.href = `trailer.html?movie=${encodeURIComponent(target)}`;
}

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function loadTrailerFromQuery() {
    const movieKey = getQueryParam('movie');
    const trailer = trailerMap[movieKey];
    const titleElement = document.getElementById('trailer-title');
    const iframeElement = document.getElementById('trailer-iframe');
    const descriptionElement = document.getElementById('trailer-description');
    const youtubeButtonElement = document.getElementById('youtube-button');

    if (!trailer || !iframeElement || !titleElement || !descriptionElement || !youtubeButtonElement) {
        if (titleElement) {
            titleElement.textContent = 'Trailer Tidak Ditemukan';
        }
        if (descriptionElement) {
            descriptionElement.textContent = 'Film tidak ditemukan. Silakan kembali ke beranda dan pilih film lain.';
        }
        if (iframeElement) {
            iframeElement.src = '';
        }
        if (youtubeButtonElement) {
            youtubeButtonElement.style.display = 'none';
        }
        return;
    }

    titleElement.textContent = `Trailer ${trailer.title}`;
    descriptionElement.textContent = `Menampilkan trailer ${trailer.title}.`;
    iframeElement.src = trailer.embedUrl;
    youtubeButtonElement.onclick = () => window.open(trailer.embedUrl.replace('/embed/', '/watch?v='), '_blank');
    youtubeButtonElement.style.display = 'inline';
}

window.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('trailer-iframe')) {
        loadTrailerFromQuery();
    }
});

function hitung() {
    let nama = document.getElementById("nama").value;
    let hp = document.getElementById("hp").value;
    let tiket = document.getElementById("tiket").value;

    if (hp.length != 12 || isNaN(hp)) {
        alert("Nomor HP harus 12 digit angka!");
        return;
    }

    if (tiket > 9) {
        alert("Maksimal tiket 9!");
        return;
    }

    let total = tiket * 35000;

    if (document.getElementById("popcorn").checked) total += 10000;
    if (document.getElementById("bread").checked) total += 10000;
    if (document.getElementById("drink").checked) total += 5000;
    if (document.getElementById("coldtea").checked) total += 5000;

    document.getElementById("total").innerText = total;
}

function uploadBukti() {
    alert('Upload clicked'); // Debug
    const fileInput = document.getElementById('buktiFile');
    const notification = document.getElementById('notification');

    if (!fileInput || !notification) {
        alert('Elements not found'); // Debug
        return;
    }

    const file = fileInput.files[0];

    if (!file) {
        showNotification('Silakan pilih file terlebih dahulu.', 'error');
        return;
    }

    // Validasi ekstensi
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        showNotification('Format file tidak valid. Hanya JPG, PNG, atau PDF yang diperbolehkan.', 'error');
        return;
    }

    // Validasi ukuran (maks 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showNotification('Ukuran file terlalu besar. Maksimal 5MB.', 'error');
        return;
    }

    // Simulasi upload berhasil
    showNotification('Bukti pembayaran berhasil diupload dan valid!', 'success');

    // Reset form
    fileInput.value = '';
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    // Sembunyikan setelah 5 detik
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}