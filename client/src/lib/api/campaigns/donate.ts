type Message = {
  message: string;
};

const donate = async ({
  campaignId,
  message,
  amount,
}: {
  campaignId: string;
  amount: number;
  message: string;
}): Promise<Message> => {
  const res = await fetch("/api/campaign/donate", {
    method: "POST",
    body: JSON.stringify({
      campaignId,
      amount,
      message,
    }),
  });
  const response = await res.json();
  return response;
};
export default donate;
