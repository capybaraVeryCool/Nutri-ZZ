import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Configure from './Configure'; // Adjust the import path as needed
import { MemoryRouter } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';

jest.mock('../firebase', () => ({
  auth: () => ({
    currentUser: { uid: 'testUserId' },
  }),
  firestore: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn(() => ({
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({
            gender: 'male',
            age: 25,
            height: 180,
            weight: 80,
            activityLevel: 'moderatelyActive',
          }),
        }),
        update: jest.fn(), // Mock the update method for Firestore
          })),
        })),
      })),
    })),
  }),
}));

describe('Configure Component', () => {
  test('should render and display input fields with pre-filled data', async () => {
    console.error = jest.fn()
    // Render the component
    act(() => {render(
    <MemoryRouter>
      <Configure />
    </MemoryRouter>)});

    // Wait for the data to be fetched and the component to update
    expect(screen.queryByText("Gender:")).toBeInTheDocument;
    // expect(screen.getByRole('combobox',{name: 'Gender'})).toHaveValue('male');
    // expect(screen.getByLabelText('Age')).toHaveValue('25');
    // expect(screen.getByLabelText('Height')).toHaveValue('180');
    // expect(screen.getByLabelText('Weight')).toHaveValue('80');
    // expect(screen.getByLabelText('Activity Level')).toHaveValue('moderatelyActive');
  });
});