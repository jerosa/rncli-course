import axios from "axios";
import { useEffect, useRef, useState } from "react";
import type { ReqResUserListResponse, User } from "../interfaces";


const loadUsers = async (page: number = 1): Promise<User[]> => {

  try {
    const { data } = await axios.get<ReqResUserListResponse>('https://reqres.in/api/users', {
      params: {
        page: page
      },
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    });
    return data.data;
  }
  catch (error) {
    console.log(error);
    return [];
  }
}


export default function useUsers() {

  const [users, setUsers] = useState<User[]>([]);
  const currentPageReg = useRef(1);

  useEffect(() => {
    loadUsers(currentPageReg.current).then(users => setUsers(users));
  }, [])


  const nextPage = async () => {
    currentPageReg.current++;
    const users = await loadUsers(currentPageReg.current);
    if (users.length > 0) {
      setUsers(users);
    } else {
      currentPageReg.current--;
    }
  }

  const prevPage = async () => {
    if (currentPageReg.current < 1) return;

    currentPageReg.current--;
    const users = await loadUsers(currentPageReg.current);
    setUsers(users);
  }

  return {
    // properties
    users,

    // methods
    nextPage,
    prevPage
  }

}
