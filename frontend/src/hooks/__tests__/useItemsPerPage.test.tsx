import { renderHook, act } from '@testing-library/react';
import UseItemsPerPage from '../useItemsPerPage';  

describe('UseItemsPerPage', () => {
  let originalInnerWidth: number;

  beforeAll(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
  });

  it('should return 32 items per page for screen width >= 1536px', () => {
    window.innerWidth = 1536;
    const { result } = renderHook(() => UseItemsPerPage());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(32); 
  });

  it('should return 25 items per page for screen width >= 1024px', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => UseItemsPerPage());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(25); 
  });

  it('should return 10 items per page for screen width >= 640px', () => {
    window.innerWidth = 640;
    const { result } = renderHook(() => UseItemsPerPage());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(10); 
  });

  it('should correctly increase items per page if width changes from >=640px to >= 1536px', () => {
    window.innerWidth = 640;
    const { result } = renderHook(() => UseItemsPerPage());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(10); 

    window.innerWidth = 1536;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(32); 
  });

  it('should correctly decrease items per page if width changes from >=1280px to >= 768px', () => {
    window.innerWidth = 1280;
    const { result } = renderHook(() => UseItemsPerPage());

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(30); 

    window.innerWidth = 768;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(15); 
  });
});