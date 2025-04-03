import React from 'react';
import MyTicketTable from './my-ticket-table';

const fakeTickets = [
  {
    id: "1",
    eventName: "Concert A",
    eventPrice: "50",
    date: "2025-04-10",
    venue: "Stadium X",
    paymentStatus: "Paid",
    confirmationStatus: "Confirmed",
  },
  {
    id: "2",
    eventName: "Tech Conference",
    eventPrice: "100",
    date: "2025-05-15",
    venue: "Convention Center",
    paymentStatus: "Pending",
    confirmationStatus: "Pending",
  },
];

const MyTicket = () => {
    return (
      <>
        <MyTicketTable tickets={fakeTickets} />
      </>
    );
};

export default MyTicket;