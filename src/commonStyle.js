//스타일 공통부 정의
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    font-family: 'SpoqaHanSansNeo-R';
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  img {
    display: block;
    vertical-align: top;
  }


  @font-face {
    font-family: 'SpoqaHanSansNeo-R';
    src: url(/fonts/SpoqaHanSansNeo-Regular.otf);
    font-weight: normal;
    font-style: normal;
  }
`
/**
 * react-router-dom -> Link 밑줄 제거
 */
export const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`
/**
 * 미디어쿼리
 */
export const Size = {
  wide: '1260px',
  tablet: '768px',
  mobile: '375px',
}
export const MediaQuery = {
  wide: `@media (max-width: ${Size.wide})`,
  tablet: `@media (max-width: ${Size.tablet})`,
  mobile: `@media (max-width: ${Size.mobile})`,
}

/**
 * mixin 선언부
 */

//flex ====================================
export const FlexStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

// ${props => props.type === 'col' ?
// `flex-direction: column;` : `flex-direction: row;`}
export const MAX_WIDTH = 1260;
export const CommonLayOut = styled.div`
  width: 100%;
  margin: auto auto;
  padding: 0 15px;
  box-sizing: border-box;
  ${props => {
    switch (props.width) {
      case MAX_WIDTH:
        return `max-width: 1260px`;
      default:
        return '';
    }
  }}
`


/**
 * 전역CSS 말줄임처리
 */
export const elip1 = css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export const hidden = css`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;