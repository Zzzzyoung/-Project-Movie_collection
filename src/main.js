const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzZmI5OTkyMjA2MjRiM2U3MmZlN2RmYTNmZDllOCIsInN1YiI6IjY1OTZkZDYyZWEzN2UwMDZmYTRjZDVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gq8AghSSWR5zlZngutCS3V1eRtf8JDANW3gZOJpOIUA"
  }
};

let movies = [];

function fetchMovies() {
  fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1", options)
    .then((response) => response.json())
    .then((response) => {
      movies = response.results; // 영화 데이터를 배열에 저장
      makeMovieCards(movies); // 영화 카드 만들기 함수 호출
      hideMovies(); // 페이지 로드 시 .movie 숨기기(토글버튼)
    })
    .catch((err) => console.error(err));
}

// 영화 카드 만들기
function makeMovieCards(movies) {
  const moviesBox = document.getElementById("movieCardList");

  movies.forEach((movie) => {
    const template = `
          <li id=${movie.id} class="movieCard">
          <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=""/>
          <h2 class="movieTitle">${movie.title}</h2>
          <p class="movieOverview">${movie.overview}</p>
          <p class="movieRate"><span class="star">⭐${movie.vote_average.toFixed(1)}</p>
          </li>`;

    moviesBox.insertAdjacentHTML("beforeend", template);
  });
}

// 페이지 로드 시 fetchMovies 함수 호출
document.addEventListener("DOMContentLoaded", fetchMovies);

// id값 알려주는 alert 창 띄우기
const cardList = document.querySelector("#movieCardList");

cardList.addEventListener("click", clickCard);

// 이벤트 위임: 하위요소에서 발생한 이벤트를 상위요소에서 처리
function clickCard({ target }) {
  // 카드 외 영역 클릭 시 무시
  if (target === cardList) return;

  if (target.matches(".movieCard")) {
    alert(`영화 id: ${target.id}`);
  } else {
    // 카드의 자식 태그 (img, h3, p) 클릭 시 부모의 id로 접근
    alert(`영화 id: ${target.parentNode.id}`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const moviesBox = document.getElementById("movieCardList");

  // 페이지 로딩 시 검색창에 포커스 주기
  searchInput.focus();

  searchBtn.addEventListener("click", (event) => {
    // 이벤트의 기본 동작인 페이지 새로고침을 막음
    event.preventDefault();

    // 입력한 검색어를 변수에 할당
    const searchInputLower = searchInput.value;

    // 영화 제목에 검색어가 포함된 영화만 선택
    const searchMovies = movies.filter((movie) => movie.title.includes(searchInputLower));

    // moviesBox의 내용 비워줌
    moviesBox.innerHTML = "";

    // 입력값이 없을 경우 경고창 띄워줌
    if (searchInput.value === "") {
      alert("영화 제목을 입력해주세요.");
    }

    // 선택된 영화만 함수 실행시켜 카드 만들어줌
    makeMovieCards(searchMovies);
  });
});

// 페이지 새로고침 시 movieCard가 보이지 않는 것을 기본 값으로
function hideMovies() {
  let cards = document.querySelectorAll(".movieCard");

  cards.forEach((card) => {
    card.style.display = "none";
  });

  // 토글 되어도 배경색 유지 위함
  document.body.style.backgroundColor = "gainsboro";
}

// 클릭 이벤트 발생 시 openclose 함수 호출
document.getElementById("togglehBtn").addEventListener("click", () => {
  openclose();
});

// 영화 목록 보기 버튼 클릭 시 토글
function openclose() {
  let cards = document.querySelectorAll(".movieCard");

  // none이면 block으로, block이면 none으로
  cards.forEach((card) => {
    if (card.style.display === "none" || card.style.display === "") {
      card.style.display = "flex"; // 나타나도록
    } else {
      card.style.display = "none"; // 사라지도록
    }
  });
}

// 클릭 이벤트 발생 시 scrollToTop 함수 호출
document.getElementById("toTop").addEventListener("click", () => {
  scrollToTop();
});

// 페이지 상단으로 올라가는 함수(top 버튼)
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
