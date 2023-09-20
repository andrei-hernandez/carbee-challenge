export interface IAppointment {
  id: string;
    paymentId: string;
    userId: string;
    duration: number;
    scheduledTime: string;
    status: "SCHEDULED" | "PAID" | "COMPLETE" | "IN_PROGRESS";
    workOrder: {
      service: string;
    };
}
