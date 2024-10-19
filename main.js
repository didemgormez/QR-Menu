import { renderCards } from "./scripts/ui.js";

//* data'ya her yerde erişebilmek için global değişken tanıdı
let data;

//* menü verilerini json dosyasından çeken fonksiyon
async function fetchMenu() {
  //* api'dan verileri al
  const res = await fetch("./db.json");

  //* json verisini js formatına çevir
  data = await res.json();
}

//* sayfanın yüklenme olayını izle
window.addEventListener("DOMContentLoaded", () => {
  //*verileri çeken fonksiyonu çalıştır
  fetchMenu()
    //* başarılı olduğu zaman kartları ekrana basan fond. çalış.
    .then(() => renderCards(data.menu));
});

// * buttons alanındaki inputları çağır
const inputs = document.querySelectorAll("#buttons input");

//* inputlar dizisini dön:
inputs.forEach((input) => {
  // * her bir inputun seçilme olayını izle:
  input.addEventListener("change", () => {
    // * seçilen kategoriyi, belirle
    const selected = input.id;

    // * eğer hepsi seçiliyse bütün datayı ekrana bas
    if (selected === "all") {
      renderCards(data.menu);
    } else {
      // * menü elemanlarından seçilen kategoriye ait olanları filtrele
      const filtred = data.menu.filter((i) => i.category === selected);

      // *filtrelenen datayı ekrana bas
      renderCards(filtred);
    }
  });
});
