import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CabinRow from './CabinRow';

const queryClient = new QueryClient();

const cabin = {
  id: 1,
  name: 'Cozy Cabin',
  maxCapacity: 4,
  regularPrice: 100,
  discount: 20,
  image: 'https://example.com/cabin.jpg',
  description: 'A cozy cabin in the woods',
};

describe('CabinRow', () => {
  it('renders cabin details', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CabinRow cabin={cabin} />
      </QueryClientProvider>
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', cabin.image);
    expect(screen.getByText(cabin.name)).toBeInTheDocument();
    expect(screen.getByText(`Fits upto ${cabin.maxCapacity} guests`)).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  it('calls createCabin when the add button is clicked', () => {
    const createCabin = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <CabinRow cabin={cabin} createCabin={createCabin} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add to inventory' }));

    expect(createCabin).toHaveBeenCalledWith(cabin);
  });

  it('opens the edit cabin modal when the edit button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CabinRow cabin={cabin} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Edit cabin' }));

    expect(screen.getByRole('dialog', { name: 'Edit cabin' })).toBeInTheDocument();
  });

  it('opens the delete cabin modal when the delete button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CabinRow cabin={cabin} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete cabin' }));

    expect(screen.getByRole('dialog', { name: 'Delete cabin' })).toBeInTheDocument();
  });
});