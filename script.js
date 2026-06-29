let scannedID = "";
let isProcessing = false;

function onScanSuccess(decodedText) {

  if (isProcessing) return; // cegah spam scan
  isProcessing = true;

  scannedID = decodedText;

  document.getElementById("nama").innerText = "Memuat...";
  document.getElementById("kelas").innerText = "";
  document.getElementById("status").innerText = "";

  fetch("https://script.google.com/macros/s/AKfycbx27iCTIEHqS6W36j3oF3BVsh34pyCmNiXk_8DWDiFj6B7qGPJWcMd30YwtM_I06zf_/exec?id=" + scannedID)
    .then(res => res.json())
    .then(data => {

      if (!data || !data.ditemukan) {
        document.getElementById("nama").innerText = "Tidak ditemukan";
        document.getElementById("kelas").innerText = "";
        document.getElementById("status").innerText = "";
        return;
      }

      document.getElementById("nama").innerText = data.nama;
      document.getElementById("kelas").innerText = data.kelas;
      document.getElementById("status").innerText = data.status || "-";

    })
    .catch(err => {
      document.getElementById("status").innerText = "Error ambil data";
    })
    .finally(() => {
      setTimeout(() => {
        isProcessing = false; // reset scan
      }, 2000);
    });
}
function izinKeluar() {

  if (!scannedID) {
    alert("Scan dulu santri!");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbx27iCTIEHqS6W36j3oF3BVsh34pyCmNiXk_8DWDiFj6B7qGPJWcMd30YwtM_I06zf_/exec?id=" + scannedID)
    .then(res => res.json())
    .then(data => {
      alert(data.nama + " diizinkan keluar");
    });
}

function santriKembali() {

  if (!scannedID) {
    alert("Scan dulu santri!");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbx27iCTIEHqS6W36j3oF3BVsh34pyCmNiXk_8DWDiFj6B7qGPJWcMd30YwtM_I06zf_/exec?id=" + scannedID)
    .then(res => res.json())
    .then(data => {
      alert(data.nama + " sudah kembali");
    });
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: 250 }
);

html5QrcodeScanner.render(onScanSuccess);
