import createCampaign from "@/lib/api/campaigns/create";
import { useState } from "react";
import { useMutation } from "react-query";
import { UploadDropzone } from "@/lib/uploadThingButton";
import { MdDelete } from "react-icons/md";

const CreateFundraiser = () => {
  const [title, setTitle] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const mutate = useMutation({
    mutationKey: ["create fundraiser"],
    mutationFn: () =>
      createCampaign({ title, amount, date, description, images: images }),
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <div>
      <p className="font-semibold text-xl py-8">Create Campaign</p>
      <form
        className="flex flex-col gap-4 transition-all"
        onSubmit={(event) => {
          event.preventDefault();
          mutate.mutateAsync();
        }}
      >
        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />

        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="number"
          step={0.01}
          min={0.01}
          name="amount"
          placeholder="Amount (ETH)"
          required
          onChange={(event) => setAmount(Number(event.target.value))}
          value={amount}
        />

        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="date"
          name="date"
          placeholder="Expires"
          required
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
        {images.length !== 0 && (
          <div>
            <p>Uploaded Images:</p>
            <div className="grid md:grid-cols-6 grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  className="flex items-center gap-2 bg-secondary rounded-md hover:bg-background hover:border-2 hover:border-muted"
                  key={index}
                >
                  <img
                    src={image}
                    alt={`${image} image`}
                    className="w-20 rounded-lg"
                  />
                  <button className="flex gap-2 items-center ">
                    <MdDelete />
                    <p>Remove</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            alert("Upload Completed");
            const images = res.map((file) => file.url);
            setImages((prevValue) => [...prevValue, ...images]);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          onUploadBegin={(name) => {
            console.log("Uploading: ", name);
          }}
        />
        <textarea
          className="p-4 border border-muted rounded-md bg-transparent"
          name="description"
          placeholder="Description"
          required
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        ></textarea>

        <button
          type="submit"
          className=" p-4 rounded-md bg-secondary hover:bg-transparent border border-muted"
        >
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateFundraiser;
