
// ===============================
// Ambil database dari localStorage
// ===============================

let database =
JSON.parse(localStorage.getItem("database")) || [];


// ===============================
// SIMPAN DATA
// ===============================

function simpanData() {

    let data = {

        lantai: document.getElementById("lantai").value,
        nomor: document.getElementById("nomor").value,

        before: document.getElementById("before").value,
        after: document.getElementById("after").value,

        bulan: document.getElementById("bulan").value,
        tahun: document.getElementById("tahun").value,

        catatanDoor:
        document.getElementById("catatanDoor").value,

        freq24:
        document.getElementById("freq24").value,

        power24:
        document.getElementById("power24").value,

        freq5:
        document.getElementById("freq5").value,

        power5:
        document.getElementById("power5").value,

        channel:
        document.getElementById("channel").value,

        catatan:
        document.getElementById("catatan").value,

        tanggal:
        new Date().toLocaleDateString("id-ID")

    };


    // ==========================
    // CEK MODE EDIT
    // ==========================

    let editinput =
    localStorage.getItem("editinput");


    if (editinput !== null) {

        database[editinput] = data;

        localStorage.removeItem("editinput");

    }

    else {

        database.push(data);

    }


    localStorage.setItem(
        "database",
        JSON.stringify(database)
    );


    alert("Data berhasil disimpan");

    window.location.href =
    "database.html";

}



// ===============================
// LOAD DATA SAAT EDIT
// ===============================

function loadEditData() {

    let editinput =
    localStorage.getItem("editinput");


    if (editinput === null) {

        return;

    }


    database =
    JSON.parse(
        localStorage.getItem("database")
    ) || [];


    let data =
    database[editinput];


    if (!data) {

        return;

    }


    document.getElementById("lantai").value =
    data.lantai;

    document.getElementById("nomor").value =
    data.nomor;

    document.getElementById("before").value =
    data.before;

    document.getElementById("after").value =
    data.after;

    document.getElementById("bulan").value =
    data.bulan;

    document.getElementById("tahun").value =
    data.tahun;

    document.getElementById("catatanDoor").value =
    data.catatanDoor;

    document.getElementById("freq24").value =
    data.freq24;

    document.getElementById("power24").value =
    data.power24;

    document.getElementById("freq5").value =
    data.freq5;

    document.getElementById("power5").value =
    data.power5;

    document.getElementById("channel").value =
    data.channel;

    document.getElementById("catatan").value =
    data.catatan;

}



// ===============================
// TOMBOL EDIT
// ===============================

function editData(input) {

    localStorage.setItem(
        "editinput",
        input
    );

    window.location.href =
    "index.html";

}



// ===============================
// JALANKAN SAAT HALAMAN INPUT DIBUKA
// ===============================

window.addEventListener("DOMContentLoaded",function(){

    if(document.getElementById("btnSimpan")){

        loadEditData();

        document
        .getElementById("btnSimpan")
        .onclick=simpanData;

    }

});




// ====================================
// TAMPILKAN DATABASE
// ====================================

function tampilkanDatabase(filter = "Semua") {

    database =
    JSON.parse(localStorage.getItem("database")) || [];

    let isi = "";

    let jumlah = 0;

    database.forEach((data, index) => {

        if (filter == "Semua" || data.lantai == filter) {

            jumlah++;

            isi += `

            <div class="card">

                <div class="headerCard">

                    <div>

                        <h2>Kamar ${data.nomor}</h2>

                        <small>
                        Lantai ${data.lantai}
                        </small>

                    </div>

                </div>

                <div class="grid">

                    <div>

                        <b>Before</b>

                        <p>${data.before}</p>

                    </div>

                    <div>

                        <b>After</b>

                        <p>${data.after}</p>

                    </div>

                </div>

                <div class="grid">

                    <div>

                        <b>Expired</b>

                        <p>

                        ${data.bulan}
                        ${data.tahun}

                        </p>

                    </div>

                    <div>

                        <b>Channel TV</b>

                        <p>

                        ${data.channel}

                        </p>

                    </div>

                </div>

                <hr>

                <br>

                <h4>

                Access Point

                </h4>

                <p>

                Frekuensi 2.4 GHz :

                ${data.freq24}

                </p>

                <p>

                Power DB :

                ${data.power24}

                </p>

                <br>

                <p>

                Frekuensi 5 GHz :

                ${data.freq5}

                </p>

                <p>

                Power DB :

                ${data.power5}

                </p>

                <br>

                <b>

                Catatan Door Lock

                </b>

                <p>

                ${data.catatanDoor}

                </p>

                <br>

                <b>

                Catatan Umum

                </b>

                <p>

                ${data.catatan}

                </p>

                <div class="buttonGroup">

                    <button
                    class="edit"
                    onclick="editData(${index})">

                    Edit

                    </button>

                    <button
                    class="hapus"
                    onclick="hapusData(${index})">

                    Hapus

                    </button>

                </div>

            </div>

            `;

        }

    });

    if(document.getElementById("databaseList")){

    document.getElementById("databaseList").innerHTML=isi;

}

if(document.getElementById("jumlahData")){

document.getElementById("jumlahData").innerHTML =
jumlah + " kamar dicek";

}

if(document.getElementById("judulLantai")){

    if (filter == "Semua") {

        document.getElementById("judulLantai").innerHTML =
        "Semua Lantai";

    }

    else {

        document.getElementById("judulLantai").innerHTML =
        "Lantai " + filter;

    }

}
}


// ====================================
// FILTER
// ====================================

function filterData(lantai){

    tampilkanDatabase(lantai);

}


// ====================================
// HAPUS DATA
// ====================================

function hapusData(index){

    let konfirmasi = confirm(

        "Hapus data ini?"

    );

    if(!konfirmasi){

        return;

    }

    database.splice(index,1);

    localStorage.setItem(

        "database",

        JSON.stringify(database)

    );

    tampilkanDatabase();

}



// ====================================
// HAPUS SEMUA
// ====================================

function hapusSemua(){

    let konfirmasi = confirm(

        "Yakin ingin menghapus semua data?"

    );

    if(!konfirmasi){

        return;

    }

    database=[];

    localStorage.setItem(

        "database",

        JSON.stringify(database)

    );

    tampilkanDatabase();

}


// ====================================
// AUTO LOAD DATABASE
// ====================================

window.addEventListener("DOMContentLoaded",()=>{

    if(document.getElementById("databaseList")){

        tampilkanDatabase();

    }

});



//==================================
// PREVIEW PRINT
//==================================

function previewPrint(){

let database=
JSON.parse(localStorage.getItem("database"))||[];

let lantai = "";

let tanggal = "";

if(document.getElementById("lantaiPrint")){

    lantai =
    document.getElementById("lantaiPrint").value;

}

if(document.getElementById("tanggalPrint")){

    tanggal =
    document.getElementById("tanggalPrint").value;

}

let hasil="";

database.forEach((data)=>{

let tampil=true;

if(lantai != "" && lantai != "Semua"){

if(data.lantai!=lantai){

tampil=false;

}

}

if(tanggal!=""){

let t=new Date(data.tanggal);

let pilih=new Date(tanggal);

if(t.toDateString()!=pilih.toDateString()){

tampil=false;

}

}

if(tampil){

hasil+=`

<div class="card">

<h3>

Kamar ${data.nomor}

</h3>

<p>

Lantai :
${data.lantai}

</p>

<p>

Before :
${data.before}

</p>

<p>

After :
${data.after}

</p>

<p>

Expired :
${data.bulan}
${data.tahun}

</p>

<p>

Frekuensi 2.4 GHz :
${data.freq24}

</p>

<p>

Power DB :
${data.power24}

</p>

<p>

Frekuensi 5 GHz :
${data.freq5}

</p>

<p>

Power DB :
${data.power5}

</p>

<p>

Channel :
${data.channel}

</p>

<p>

Catatan :
${data.catatan}

</p>

</div>

`;

}

});

if(document.getElementById("hasilPrint")){

document.getElementById("hasilPrint").innerHTML=hasil;

}

}
