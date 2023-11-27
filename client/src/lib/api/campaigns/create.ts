type Message = {
  message: string;
};

const createCampaign = async ({
  title,
  description,
  images,
  date,
  amount,
  location,
  category,
}: {
  title: string;
  description: string;
  amount: number;
  date: string;
  images: string[];
  location: string;
  category: string;
}): Promise<Message> => {
  const res = await fetch("/api/campaign/create", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      amount,
      date,
      images,
      location,
      category,
    }),
  });
  const response = await res.json();
  return response;
};
export default createCampaign;
