type Message = {
  message: string;
};

const createCampaign = async ({
  title,
  description,
  images,
  date,
  amount,
}: {
  title: string;
  description: string;
  amount: number;
  date: string;
  images: string[];
}): Promise<Message> => {
  const res = await fetch("/api/campaign/create", {
    method: "POST",
    body: JSON.stringify({ title, description, amount, date, images }),
  });
  const response = await res.json();
  return response;
};
export default createCampaign;
