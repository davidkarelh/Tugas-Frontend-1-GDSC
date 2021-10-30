let searchBtn = document.getElementById("btn")
let searchArea = document.getElementById("area")
let list = document.getElementById("list")
let mybtn = document.getElementById("myBtn")

const getCards = (res) => {
  let val = "";
  res.forEach(elmt => {
    val += `
    <li class="li">
      <div class="card">
        <img src= \"https://image.tmdb.org/t/p/w500/` + elmt.poster_path + `\" alt="Avatar" style="width:100%" />
        <div class="container">
          <h4>
            <b>` + elmt.original_title + `</b>
          </h4>
          <p class="date">` + elmt.release_date + `</p>
          <button class="myBtn" data-title="` + elmt.original_title +`" data-description="` + elmt.overview +`">Detail</button>
        </div>
      </div>
    </li>`;
  })
  return val;
}

searchArea.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
        list.innerHTML = `<div class="loader"></div>`;
        fetch(
            "https://api.themoviedb.org/3/search/movie?api_key=8da85a40aec5b3ee7fb116f3feba09a9&query=" + searchArea.value
            )
            .then((res) => res.json())
            .then((res) => res.results)
            .then((res) => {
                let val = "";
                if (res == null) {
                  val += `<p class="alert">Tolong masukkan keyword!</p>`;
                  list.innerHTML = val;
                } else {
                  let len = res.length;
                  if (len === 0) {
                      val += `<p class="alert">Film dengan keyword yang dimasukkan tidak ada</p>`
                  } else {
                      val = getCards(res);
                  }
                  list.innerHTML = val;
                  const detailButton = document.querySelectorAll(".myBtn");
                  detailButton.forEach(btn => {
                    btn.addEventListener("click", function () {
                      let val2 = "";
                      val2 += `<h4 class="judul">` + this.dataset.title + `</h4>`;
                      val2 += `<p class="alert">` + this.dataset.description + `</p>`;
                      list.innerHTML = val2;
                    })
                  })
                }
            });
    }
})

searchBtn.addEventListener("click", () => {
  list.innerHTML = `<div class="loader"></div>`;
  fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=8da85a40aec5b3ee7fb116f3feba09a9&query=" + searchArea.value
      )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        let val = "";
        if (res == null) {
          val += `<p class="alert">Tolong masukkan keyword!</p>`;
          list.innerHTML = val;
        } else {
          let len = res.length;
          if (len === 0) {
              val += `<p class="alert">Film dengan keyword yang dimasukkan tidak ada</p>`;
          } else {
              val = getCards(res);
          }
          list.innerHTML = val;
          const detailButton = document.querySelectorAll(".myBtn");
          detailButton.forEach(btn => {
            btn.addEventListener("click", function () {
              let val2 = "";
              val2 += `<h4 class="judul">` + this.dataset.title + `</h4>`;
              val2 += `<p class="alert">` + this.dataset.description + `</p>`;
              list.innerHTML = val2;
            })
          })
        }
      });
});