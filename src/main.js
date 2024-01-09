import { movies, fetchMovies, makeMovieCards, hideMovies, openclose, scrollToTop } from "./movie.js";
import { searchMovies } from "./search.js";

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
    const searchInputValue = searchInput.value;

    // 영화 제목에 검색어가 포함된 영화만 선택
    const searchedMovies = searchMovies(movies, searchInputValue);

    // moviesBox의 내용 비워줌
    moviesBox.innerHTML = "";

    // 입력값이 없을 경우 경고창 띄워줌
    if (searchInput.value === "") {
      alert("영화 제목을 입력해주세요.");
    }

    // 선택된 영화만 함수 실행시켜 카드 만들어줌
    makeMovieCards(searchedMovies);
  });
});

// 페이지 새로고침 시 movieCard가 보이지 않는 것을 기본 값으로
hideMovies();

// 클릭 이벤트 발생 시 openclose 함수 호출
document.getElementById("togglehBtn").addEventListener("click", () => {
  openclose();
});

// 클릭 이벤트 발생 시 scrollToTop 함수 호출
document.getElementById("toTop").addEventListener("click", () => {
  scrollToTop();
});
