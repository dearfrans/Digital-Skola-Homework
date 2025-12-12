// sesi3_DearFransLyandreSimanjorang.js

let tinggi = 8; // jumlah baris segitiga

for (let i = 1; i <= tinggi; i++) {
    let baris = "";
    for (let j = 1; j <= i; j++) {
        baris += "*";
    }
    console.log(baris);
}