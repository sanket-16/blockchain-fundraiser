type Message = {
  message: string;
};

const updateStatus = async ({
  id,
  status,
}: {
  id: string;
  status: "Waiting" | "Rejected" | "Approved";
}): Promise<Message> => {
  const res = await fetch("/api/campaign/status", {
    method: "POST",
    body: JSON.stringify({
      id,
      status,
    }),
  });
  const response = await res.json();
  return response;
};
export default updateStatus;
