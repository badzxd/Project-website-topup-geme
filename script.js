document.addEventListener("DOMContentLoaded", () => {
    loadSurahList();
    loadJadwalSholat();
    loadDoaList();
    loadKisahRasul();
});

// 1. **Juz Amma Online**
function loadSurahList() {
    fetch("https://api.alquran.cloud/v1/surah")
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("surah-list");
            data.data.forEach(surah => {
                let surahElement = document.createElement("div");
                surahElement.innerHTML = `
                    <p>${surah.number}. ${surah.englishName} (${surah.name})</p>
                    <audio controls>
                        <source src="https://download.quranicaudio.com/qdc/thaha_junayd/murattal/${surah.number}.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                `;
                container.appendChild(surahElement);
            });
        });
}

// 2. **Jadwal Sholat**
function loadJadwalSholat() {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=2")
        .then(response => response.json())
        .then(data => {
            let jadwal = data.data.timings;
            document.getElementById("jadwal-container").innerHTML = `
                <p>Subuh: ${jadwal.Fajr}</p>
                <p>Dzuhur: ${jadwal.Dhuhr}</p>
                <p>Ashar: ${jadwal.Asr}</p>
                <p>Maghrib: ${jadwal.Maghrib}</p>
                <p>Isya: ${jadwal.Isha}</p>
            `;
        });
}

// 3. **Doa Harian**
function loadDoaList() {
    fetch("doa.json")
        .then(response => response.json())
        .then(data => {
            let doaList = document.getElementById("doa-list");
            data.forEach(doa => {
                let li = document.createElement("li");
                li.innerHTML = `
                    <strong>${doa.judul}</strong>: ${doa.teks}
                    <br>
                    <audio controls>
                        <source src="${doa.audio}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                `;
                doaList.appendChild(li);
            });
        });
}

// 4. **Kisah 25 Rasul**
function loadKisahRasul() {
    fetch("kisah-rasul.json")
        .then(response => response.json())
        .then(data => {
            let kisahList = document.getElementById("kisah-list");
            data.forEach(kisah => {
                let li = document.createElement("li");
                li.innerHTML = `
                    <img src="${kisah.gambar}" alt="${kisah.nama}" style="width:100px;height:auto;">
                    <br>
                    <strong>${kisah.nama}</strong>: ${kisah.kisah}
                `;
                kisahList.appendChild(li);
            });
        });
}
