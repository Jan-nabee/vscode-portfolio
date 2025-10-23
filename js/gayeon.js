$(document).ready(function () {
  
  console.log(!!window.gsap, !!window.ScrollTrigger);
  
  
  function showByLabel(label) {
    $('.hero, .about_page, .skills_page, .projects_page, .strengths_page, .contact_page').hide();

    switch (label) {
      case 'About':     $('.about_page').show(); break;
      case 'Skills':    $('.skills_page').show(); break;
      case 'Projects':  $('.projects_page').show(); break;
      case 'Strengths': $('.strengths_page').show(); break;
      case 'Contact':   $('.contact_page').show(); break;
      default:          $('.hero').show(); // fallback
    }
  }

  //초기상태 
  showByLabel('');



  // 어사이드 메뉴 순차 등장
  $('.sidebar-menu .menu-item').each(function (index) {
    const that = $(this);
    setTimeout(function () {
      that.addClass('visible');
    }, index * 200);
  });
 

  // 히어로 영역 텍스트 타이핑 함수
  function typeTextBySpan(spanId, text, delay, callback) {

    const textEl = document.getElementById(spanId);
    if (!textEl) return;

    //해당 줄 내부의 기존 커서 제거
    textEl.querySelectorAll('.cursor').forEach(cursor => cursor.remove());

    
    textEl.textContent = ''; // 텍스트 초기화

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    textEl.appendChild(cursor);

    let i = 0;
    const timer = setInterval(() => {
      cursor.insertAdjacentText("beforebegin", text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        cursor.remove(); // 현재 줄 커서 제거
        if (callback) callback();
      }
    }, delay);
  }

  let heroTyped = false;

  function startTypingInHero() {
    if (heroTyped) return;
    heroTyped = true;
  
    // 타이핑 순차 실행
    typeTextBySpan("typing-title", "<문가연>", 250, () => {
      typeTextBySpan("typing-line1", "// 홍보 실무 7년 기반의 -", 100, () => {
        typeTextBySpan("typing-line2", "// 기획자의 시선을 가진 프론트엔드 개발자", 100);
      });
    });
  }
  //페이지 첫 로딩 시 히어로 영역 타이핑 실행
  startTypingInHero();

  

  function typeTextBySpanSkill(spanId, text, delay, callback) {
  const textEl = document.getElementById(spanId);
  if (!textEl) return;

  // 기존 커서 1개만 제거
  const oldCursor = textEl.querySelector('.skill-cursor');
  if (oldCursor) oldCursor.remove();

  textEl.textContent = ''; // 기존 텍스트 초기화

  const cursor = document.createElement('span');
  cursor.className = 'skill-cursor';
  cursor.textContent = '|';
  textEl.appendChild(cursor);

  let i = 0;
  const timer = setInterval(() => {
    cursor.insertAdjacentText('beforebegin', text.charAt(i));
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      cursor.remove();
      if (callback) callback();
    }
  }, delay);
}


 // 스킬 섹션 타이핑 함수

  function startTypingInSkills() {
    typeTextBySpanSkill("typing-skill-title", "7년간의 홍보 경험으로 기획력과 소통 능력을 키웠습니다.", 100, () => {
      typeTextBySpanSkill("typing-skill-line1", "지금은 프론트엔드 개발자로 실행과 협업의 폭을 넓히고 있습니다.", 80, () => {
        typeTextBySpanSkill("typing-skill-line2", "기획과 구현의 접점에서, 아이디어를 현실로 만드는 연결자가 되고 싶습니다.", 80);
      });
    });
  }


  $('.menu-item').on('click', function (e) {
    e.preventDefault();

    // 라벨/상태
    $('.green-comment').remove();
    $('.menu-item').removeClass('on');
    $(this).addClass('on');
    const label = $(this).find('.label').text().trim();

    // 모두 숨김
    $('.hero, .about_page, .skills_page, .projects_page, .strengths_page, .contact_page').hide();
    $('body').addClass('label-hide');

    // 라우팅
    if (label === "About") {
      $('.about_page').show(0, function () {
        // 📌 여기서 GSAP 실행 (보여진 뒤에)
        if (typeof initAboutGsap === 'function') {
          initAboutGsap();
          // 보이는 시점에 레이아웃 바뀌었으니 리프레시
          if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
        }
      });
    } else if (label === "Skills") {
      $('#typing-skill-title, #typing-skill-line1, #typing-skill-line2').text('');
      $('.skills_page').show(0, () => setTimeout(startTypingInSkills, 100));
    } else if (label === "Projects") {
      $('.projects_page').show();
    } else if (label === "Strengths") {
      $('.strengths_page').show();
    } else if (label === "Contact") {
      $('.contact_page').show();
    } else {
      $('.hero').show();
    }
  });

  $('#logoLink').on('click', function (e) {
    e.preventDefault();
    const clean = location.origin + location.pathname;
    location.replace(clean);
  });


  // 아코디언 기능
  $('.accordion-header').on('click', function () {
    const $header = $(this);
    const $content = $header.next('.accordion-content');

    // 열려 있으면 닫기
    if ($header.hasClass('active')) {
      $header.removeClass('active');
      $content.slideUp(200);
    } else {
      $header.addClass('active');
      $content.slideDown(200);
    }
  
  });

  // 2024 ect 제어
  const $y24 = $('.year-2024');
  const $panel = $y24.find('.year-panel');

  // 마우스 들어오면 열기, 나가면 닫기
  $y24.on('mouseenter', function() {
    $panel.stop(true, true).slideDown(420);

  });

  // 터치/모바일: 탭으로 토글 열고닫기
  $y24.on('click touchstart', function() {
    $panel.stop(true, true).slideDown(420);
  });

  $('.project-box').on('click', function () {
    const isExpanded = $(this).hasClass('expanded');

    $('.project-box').removeClass('expanded');
    if (!isExpanded) {
      $(this).addClass('expanded');
    }
  });

  
});


// === 프로젝트 페이지 필터 ===
  $('.filter-btn').on('click', function() {
    const $btn = $(this);
    const filter = $btn.data('filter'); // all | frontend | branding

    // 버튼 상태 업데이트
    $('.filter-btn').removeClass('is-active').attr('aria-pressed', 'false');
    $btn.addClass('is-active').attr('aria-pressed', 'true');

    // URL 해시 동기화
    if (filter === 'all') history.replaceState(null, '', location.pathname);
    else location.hash = filter;

    const $cards = $('.projects-grid .project-box');

    if (filter === 'all') {
      $cards.each(function() {
        const $c = $(this);
        if ($c.hasClass('is-hidden')) {
          $c.removeClass('is-hidden').hide().fadeIn(160);
        }
      });
      return;
    }

    // 필터별 표시
    $cards.each(function() {
      const $c = $(this);
      const match = $c.hasClass(filter);
      if (match) {
        if ($c.hasClass('is-hidden')) {
          $c.removeClass('is-hidden').hide().fadeIn(160);
        }
      } else {
        if (!$c.hasClass('is-hidden')) {
          $c.addClass('is-hiding');
          setTimeout(function() {
            $c.addClass('is-hidden').removeClass('is-hiding');
          }, 140);
        }
      }
    });
  });

  // 페이지 진입 시 URL 해시 (#frontend / #branding)로 초기 필터 적용
  (function initFilterFromHash(){
    const hash = (location.hash || '').replace('#','');
    if (!hash) return;
    const $btn = $('.filter-btn[data-filter="'+ hash +'"]');
    if ($btn.length) $btn.trigger('click');
  })();





