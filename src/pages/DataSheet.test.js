import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataSheet from './DataSheet'; // Adjust the import path as needed
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import DateChanger from '../components/DateChanger';

// Mock firebase and other dependencies as needed
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
              data: () => ({
                // Mock data here
                nutrients: [
                  { name: 'Fat', amount: 10, unit: 'g', percentOfDailyNeeds: 20 },
                  { name: 'Sugar', amount: 15, unit: 'g', percentOfDailyNeeds: 90 },
                  // Add more mock data as needed
                ],
              }),
            }),
          })),
        })),
      })),
    })),
  }),
}));

jest.mock('../functions/helperFunctions', () => ({
  formatDate: jest.fn(() => '01-06-2023'), // Mock the formatDate function
}));


// jest.mock('react-router-dom', () => ({
//   Link: ({ to, children }) => <a href={to}>{children}</a>,
// }));

// jest.mock('@fortawesome/react-fontawesome', () => ({
//   FontAwesomeIcon: () => <span>MockFontAwesomeIcon</span>,
//   // Add other mocked FontAwesome icons here as needed
// }));

test('should render and display nutritional data', async () => {
    // Mock the props
    console.error = jest.fn();
    const mockConfig = {
      goalCal: 1400, // Mock the goalCal value
    };
    const mockDate = jest.fn(); // Mock the date value
    // Render the component with mocked props
    act(() => {render(
    <MemoryRouter>
      <DataSheet config={mockConfig} date={mockDate} />
    </MemoryRouter>)});

    // Wait for the data to be fetched and the component to update
    expect(screen.queryByText('Nutritional Data')).toBeInTheDocument();
    // expect(screen.queryByText('Nutrient1')).toBeInTheDocument();
    // expect(screen.queryByText('10g')).toBeInTheDocument();
    // expect(screen.queryByText('20% of Daily Needs')).toBeInTheDocument();
    // expect(screen.queryByText('Nutrient2')).toBeInTheDocument();
    // expect(screen.queryByText('15mg')).toBeInTheDocument();
    // expect(screen.queryByText('30% of Daily Needs')).toBeInTheDocument();

    // Test the toggle functionality
    // await userEvent.click(screen.getByRole('button'));
    // expect(screen.queryByText('Nutrient1')).toBeNull();
    // expect(screen.queryByText('10g')).toBeNull();
    // expect(screen.queryByText('20% of Daily Needs')).toBeNull();
    // expect(screen.queryByText('Nutrient2')).toBeNull();
    // expect(screen.queryByText('15mg')).toBeNull();
    // expect(screen.queryByText('30% of Daily Needs')).toBeNull();

    // Toggle back
    // await userEvent.click(screen.getByRole('button'));
    // expect(screen.queryByText('Nutrient1')).toBeInTheDocument();
    // expect(screen.queryByText('10g')).toBeInTheDocument();
    // expect(screen.queryByText('20% of Daily Needs')).toBeInTheDocument();
    // expect(screen.queryByText('Nutrient2')).toBeInTheDocument();
    // expect(screen.queryByText('15mg')).toBeInTheDocument();
    // expect(screen.queryByText('30% of Daily Needs')).toBeInTheDocument();
  });
