type Message = {
  message: string;
};

const createCampaign = async ({
  title,
  description,
  email,
  images,
  proof,
  date,
  target,
  location,
  category,
  owner,
}: {
  title: string;
  description: string;
  email: string;
  target: number;
  date: string;
  images: string[];
  proof: string[];
  location: string;
  category: string;
  owner: string;
}): Promise<Message> => {
  const res = await fetch("/api/campaign/create", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      email,
      target,
      date,
      images,
      proof,
      location,
      category,
      owner,
    }),
  });
  const response = await res.json();
  return response;
};
export default createCampaign;
