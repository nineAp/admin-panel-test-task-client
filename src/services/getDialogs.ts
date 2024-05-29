import axios from "axios";

export interface IDialog {
  id: number;
  startTime: string;
  lastMessageTime: string;
  company: string;
  employee: string;
  comments: string;
}

export default async function getDialogs(): Promise<
  Array<IDialog> | undefined
> {
  try {
    const response = await axios.get("http://147.45.239.164:8000/dialogs");
    return response.data as Array<IDialog>;
  } catch (e) {
    console.log(e);
  }
}
