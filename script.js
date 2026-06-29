let scannedID = "";

function onScanSuccess(decodedText) {
  scannedID = decodedText;

  document.getElementById("nama").innerText = "Memuat...";
  document.getElementById("kelas").innerText = "";
  document.getElementById("status").innerText = "";

  // NANTI kita ganti link ini dengan Google Apps Script kamu
  fetch("PASTE_LINK_APPS_SCRIPT_DI_SINI?id=" + decodedText)
    .then(res => res.json())
    .then(data => {
      document.getElementById("nama").innerText = data.nama;
      document.getElementById("kelas").innerText = data.kelas;
      document.getElementById("status").innerText = data.status;
    })
    .catch(err => {
      document.getElementById("status").innerText = "Error ambil data";
    });
}

function izinKeluar() {
  alert("Santri diizinkan keluar (nanti disambungkan ke database)");
}

function santriKembali() {
  alert("Santri kembali (nanti disambungkan ke database)");
}

// aktifkan kamera QR
let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: 250 }
);

html5QrcodeScanner.render(onScanSuccess);
