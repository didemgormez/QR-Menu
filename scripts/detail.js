/*
 * URL'deki arma parametrelerine(search-param) eriş
 * JS'de tarayıcı ile alkalı olan verileri erişmek istiyorsak window nesnesi kullanırız
 
 * JS'de URL'deki arama parametrelerini yönetmeye yarayab yerleşik bir class vardır. URLSearchParams.
 */

const params = new URLSearchParams(window.location.search);

//* Yukarıdaki classtan oluşturduğumuz nesne sayesinde urldeki arama parametrlerini güncellemeye / erişmeye / silmeye yarayan methodları kullanabiliyoruz bizde get methodu il id parametresine eriştik
const id = params.get("id");

// * 1) sayfanın yüklenme olayını izle
document.addEventListener("DOMContentLoaded", async () => {
  let data;
  //* 2) api'dan verileri al
  try {
    const res = await fetch("../db.json");
    const data = await res.json();

    //* 3) veriler arasından url'deki id'ye denk gelen ürünü bul
    const product = data.menu.find((item) => item.id == id);

    if (!product) {
      //* 4) ürün bulunamazsa: 404 sayfasını renderla
      renderNotFound();
    } else {
      //* 5) ürün bulunursa: sayfa içeiriğini api'dan aldığımız ürüne göre renderla
      renderPage(product);
    }
  } catch (error) {
    //* api isteğinde hata olursa:
    renderNotFound();
    alert("üzgünüz bir sorun oluştu");
  }
});

//*  içerisine sayfa içeriğini basacağımız divi çağır
const outlet = document.getElementById("outlet");

//* sayfa içeriğini aldığı parametreye göre dinamik olarak ekrana basan fonksiyon yaz
function renderPage(product) {
  outlet.innerHTML = `
      <div class="d-flex justify-content-between fs-6">
        <a href="/">
          <img width="35px" src="/images/home.png" alt="" />
        </a>

        <p>Anasayfa / ${product.category} / ${product.title.toLowerCase()} </p>
      </div>

      <h1 class="text-center my-4">${product.title} </h1>

      <img
        src="${product.img} "
        style="max-height: 400px"
        class="rounded object-fit cover shadow"
      />

      <h4 class="mt-4">
        <span>Ürünün Kategorisi:</span>
        <span class="text-success">${product.category} </span>
      </h4>

      <h4 class="mt-4">
        <span>Ürünün Fiyatı:</span>
        <span class="text-success"> ${(product.price * 30).toFixed(2)} ₺ </span>
      </h4>

      <p class="lead">
      ${product.desc}
      </p>
      `;
}

// * 404 sayfa içeriğini ekrana basan fonksiyon
function renderNotFound() {
  outlet.innerHTML = `
  <div style="height:90vh" class="d-flex justify-content-center align-items-center">

  <div class= "d-flex flex-column align-items-center gap-3">

    <h1 class="text-center">Aradığınız Ürün Mevcut Değil</h1>

    <a href="/">Anasayfaya Dönün</a>
  </div>
    </div>
    `;
}
