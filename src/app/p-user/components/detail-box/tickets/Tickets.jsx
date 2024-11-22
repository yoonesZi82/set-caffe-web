import Ticket from "./Ticket";
import DetailUserBox from "../DetailUserBox";

const Tickets = async ({ tickets }) => {
  return (
    <DetailUserBox title="تیکت های اخیر" titleButton={"همه تیکت ها"}>
      {tickets.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-2xl text-center text-navbarDashboard">
            تیکتی ثبت نشده
          </p>
        </div>
      ) : (
        <>
          {tickets.map((ticket) => {
            return <Ticket key={ticket.id} {...ticket} />;
          })}
        </>
      )}
    </DetailUserBox>
  );
};

export default Tickets;
