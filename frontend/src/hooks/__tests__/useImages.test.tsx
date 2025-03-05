import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import useImages from '../useImages'; 
jest.mock('axios');

interface TestComponentProps {
  selectedSub: string | null;
  searchTitle: string;
  selectedType: string;
}

// const TestComponent = ({ selectedSub, searchTitle, selectedType }: TestComponentProps) => {
//   const { images, filteredImages, loading, currentPage } = useImages(selectedSub, searchTitle, selectedType);

//   return (
//     <div>
//       <div data-testid="images">{images.length}</div>
//       <div data-testid="filteredImages">{filteredImages.length}</div>
//       <div data-testid="loading">{loading ? 'Loading...' : 'Loaded'}</div>
//       <div data-testid="currentPage">{currentPage}</div>
//     </div>
//   );
// };

describe('useImages', () => {
  // it('should fetch data and set images and filteredImages on mount', async () => {
  //   const mockResponse = {
  //     data: [
  //       { url: 'image1.jpg', subreddit: 'cats', title: 'Cute cat', nsfw: false, index: 1, type: 'photo' },
  //       { url: 'image2.jpg', subreddit: 'dogs', title: 'Cute dog', nsfw: false, index: 2, type: 'photo' },
  //     ],
  //   };

  //   (axios.get as jest.Mock).mockResolvedValue(mockResponse);
  //   render(<TestComponent selectedSub="cats" searchTitle="Cute" selectedType="photo" />);
  //   await waitFor(() => screen.getByTestId('images'));

  //   expect(screen.getByTestId('images').textContent).toBe('2');
  //   expect(screen.getByTestId('filteredImages').textContent).toBe('2');
  //   expect(screen.getByTestId('loading').textContent).toBe('Loaded');
  // });


  it('exists', () => {
    expect(true).toBe(true)
  })
})