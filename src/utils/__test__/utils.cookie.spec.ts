import { deleteCookie, getCookie, setCookie } from 'utils/utils.cookie';

describe('getCookie', () => {
  it('should return modern by set layout=modern', () => {
    // mock set document
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'layout=modern',
    });

    expect(getCookie('layout')).toBe('modern');
  });

  it('should return undefined by not found', () => {
    // unsubscribe all document
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: '',
    });

    expect(getCookie('layout')).toBe(undefined);
  });
});

describe('setCookie', () => {
  it('should return true by method includes', () => {
    setCookie({
      expires: new Date(),
      key: 'layout',
      value: 'modern',
    });

    expect(document.cookie.includes('layout=modern')).toBe(true);
  });

  it('should return true by method match', () => {
    setCookie({
      expires: new Date(),
      key: 'layout',
      value: 'modern',
    });

    expect(!!document.cookie.match(/layout=modern/)?.length).toBe(true);
  });

  it('should return layout=modern by string', () => {
    setCookie({
      expires: new Date(),
      key: 'layout',
      value: 'modern',
    });

    expect(document.cookie.match(/layout=modern/)?.[0]).toBe('layout=modern');
  });
});

describe('deleteCookie', () => {
  it('should return correctly string', () => {
    expect(deleteCookie('layout')).toBe('layout');
  });
});
