import { useState } from "react";
import { useMutation } from "react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";
import { UploadDropzone } from "@/lib/uploadThingButton";
import toast from "react-hot-toast";
import { useAccount, useContractWrite } from "wagmi";
import { constAbi, contractAddress } from "@/lib/contract";
import { v4 as uuidv4 } from "uuid";
import { parseEther } from "ethers";
import createCampaign from "@/lib/api/campaigns/create";

// function getEnumKeys<
//   T extends string,
//   TEnumValue extends string | number
// >(enumVariable: { [key in T]: TEnumValue }) {
//   return Object.keys(enumVariable) as Array<T>;
// }
const categories = ["Business", "Medical", "Personal"];

const CreateFundraiser = () => {
  let toastId: string;
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [proof, setProof] = useState<string[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [menu, setMenu] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { address, isConnected } = useAccount();

  // const { writeAsync, isSuccess, isError } = useContractWrite({
  //   abi: constAbi,
  //   address: contractAddress,
  //   functionName: "createCampaign",
  //   onSuccess: () => {
  //     setOpen(false);

  //     toast.remove("campaign_creation");
  //     toast.success("Campaign Created Successfully.");

  //     setTitle("");
  //     setAmount(0);
  //     setDescription("");
  //     setDate("");
  //     setLocation("");
  //     setCategory("");
  //     setImages([]);
  //   },
  //   onError: () => {
  //     setOpen(false);
  //     toast.remove("campaign_creation");
  //     toast.error("Campaign Creation failed.");
  //   },
  // });

  const mutate = useMutation({
    mutationKey: ["create fundraiser"],
    mutationFn: () =>
      createCampaign({
        title,
        target,
        date,
        description,
        images: images,
        proof,
        location,
        category,
        email,
        owner: address as string,
      }),
    onError: (err) => {
      toast.remove("campaign_creation");
      toast.error("Campaign Creation failed!");
      console.log(err);
    },
    onSuccess: (data) => {
      toast.remove("campaign_creation");
      toast.success("Campaign created successfully!");
      console.log(data);
    },
  });

  return (
    <div>
      <p className="font-semibold text-xl py-8">Create Campaign</p>
      <form
        className="flex flex-col gap-4 transition-all my-8"
        onSubmit={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        <label htmlFor="">Title *</label>
        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <label htmlFor="">Description *</label>
        <textarea
          className="p-4 border border-muted rounded-md bg-transparent"
          name="description"
          placeholder="Description"
          required
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <label htmlFor="">Amount *</label>
        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="number"
          step={1}
          min={1}
          name="amount"
          placeholder="Amount (ETH)"
          required
          onChange={(event) => setTarget(Number(event.target.value))}
          value={target}
        />
        <label htmlFor="">End Date *</label>
        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="date"
          name="date"
          placeholder="Expires"
          required
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
        <label htmlFor="">Location *</label>
        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="text"
          name="location"
          placeholder="Location"
          required
          onChange={(event) => setLocation(event.target.value)}
          value={location}
        />
        <label htmlFor="">
          Email{" "}
          <span className="text-white/50 text-xs">
            (Enter your email for updates on your campaign)
          </span>
        </label>
        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
        <label htmlFor="">Category *</label>
        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="text"
          name="category"
          placeholder="Category"
          required
          onChange={(event) => {
            setMenu(true);
            setCategory(event.target.value);
          }}
          value={category}
        />
        {menu && (
          <div className="flex flex-col w-full gap-2">
            {categories
              .filter((filteredcategory) =>
                filteredcategory?.includes(category)
              )
              .map((category) => (
                <div
                  key={category}
                  className="p-4 bg-secondary rounded-md hover:cursor-pointer"
                  onClick={() => {
                    setMenu(false);
                    setCategory(category);
                  }}
                >
                  {category}
                </div>
              ))}
          </div>
        )}
        <label htmlFor="">
          Images *{" "}
          <span className="text-white/50 text-xs">
            (These images will be publicly visible)
          </span>
        </label>
        <div className="border border-muted rounded-md">
          {images.length !== 0 && (
            <div className="p-4">
              <p>Uploaded Images:</p>
              <div className="grid md:grid-cols-6 grid-cols-2 gap-4 py-4">
                {images.map((image, index) => (
                  <div
                    className="flex items-center gap-2 bg-secondary rounded-md hover:bg-background hover:border-2 hover:border-muted"
                    key={index}
                    onClick={() =>
                      setImages((prevValue) =>
                        prevValue.filter((item) => item !== image)
                      )
                    }
                  >
                    <img
                      src={image}
                      alt={`${image} image`}
                      className="w-20 rounded-lg"
                    />
                    <div className="flex gap-2 items-center ">
                      <MdDelete />
                      <p>Remove</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              const images = res.map((file) => file.url);
              setImages((prevValue) => [...prevValue, ...images]);
              toast.remove("uploading_images");
              toast.success("Uploaded Images successfully.");
            }}
            onUploadError={(error: Error) => {
              toast.remove("uploading_images");
              toast.error("Images upload failed!", { id: "uploading_images" });
            }}
            onUploadBegin={(name) => {
              console.log("Uploading: ", name);
              toast.loading("Uploading Images", { id: "uploading_images" });
            }}
          />
        </div>
        <label htmlFor="">
          Proof{" "}
          <span className="text-white/50 text-xs">
            (These images will be only visible to admin for approval)
          </span>
        </label>
        <div className="border border-muted rounded-md">
          {proof.length !== 0 && (
            <div className="p-4">
              <p>Uploaded Images:</p>
              <div className="grid md:grid-cols-6 grid-cols-2 gap-4 py-4">
                {proof.map((image, index) => (
                  <div
                    className="flex items-center gap-2 bg-secondary rounded-md hover:bg-background hover:border-2 hover:border-muted"
                    key={index}
                    onClick={() =>
                      setProof((prevValue) =>
                        prevValue.filter((item) => item !== image)
                      )
                    }
                  >
                    <img
                      src={image}
                      alt={`${image} image`}
                      className="w-20 rounded-lg"
                    />
                    <div className="flex gap-2 items-center ">
                      <MdDelete />
                      <p>Remove</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              const images = res.map((file) => file.url);
              setProof((prevValue) => [...prevValue, ...images]);
              toast.remove("uploading_images");
              toast.success("Uploaded Images successfully.");
            }}
            onUploadError={(error: Error) => {
              toast.remove("uploading_images");
              toast.error("Images upload failed!", { id: "uploading_images" });
            }}
            onUploadBegin={(name) => {
              console.log("Uploading: ", name);
              toast.loading("Uploading Images", { id: "uploading_images" });
            }}
          />
        </div>
      </form>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <button
            type="submit"
            className=" p-4 mt-2 mb-8 w-full  rounded-md bg-primary hover:bg-background hover:text-muted-foreground text-background border border-muted"
          >
            Create Campaign
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Campaign</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to create a campaign?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                toast.loading("Creating campaign...", {
                  id: "campaign_creation",
                });
                // if (isConnected) {
                //   const args: readonly [
                //     string,
                //     `0x${string}`,
                //     string,
                //     string,
                //     string,
                //     readonly string[],
                //     bigint,
                //     bigint
                //   ] = [
                //     uuidv4(),
                //     address as `0x${string}`,
                //     title,
                //     description,
                //     category,
                //     images,
                //     parseEther(String(target)),
                //     BigInt(new Date(date).getTime()),
                //   ];
                //   // await writeAsync({ args: args });
                // }
                mutate.mutateAsync();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateFundraiser;
