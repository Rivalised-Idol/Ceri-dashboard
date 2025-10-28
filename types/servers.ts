// types/server.ts


//fetch servers
export interface Server {
  id: number;
  name: string;
  ip: string;
  protocol: string;
  country: string;
  city: string;
  is_private: boolean;
  is_active: boolean;
  config: string;
  password: string;
}

export interface ServersData {
  total_count: number;
  servers: Server[];
}

export interface ServersApiResponse {
  success: boolean;
  message: string;
  data: ServersData;
}

//fetch server by ID

export interface ServerByIdData {
  id: number;
  name: string;
  ip: string;
  protocol: string;
  country: string;
  city: string;
  is_private: boolean;
  is_active: boolean;
  config: string;
  password: string;
}

export interface ServerByIdResponse {
  success: boolean;
  message: string;
  data: ServerByIdData;
}


//create server

export interface CreateServerPayload {
  country: string;
  city: string;
  ip: string;
  name: string;
  password?: string;
  protocol: string;
  config: string;
  is_private: boolean;
  is_active: boolean;
}

export interface CreateServerData {
  id: number;
  name: string;
  ip: string;
  country: string;
  city: string;
  protocol: string;
  is_private: boolean;
  is_active: boolean;
}

export interface CreateServerResponse {
  success: boolean;
  message: string;
  data?: CreateServerData;
}


//update server

export interface UpdateServerPayload {
  city?: string;
  country?: string;
  name?: string;
  ip?: string;
  protocol?: string;
  config?: string;
  is_private?: boolean;
  is_active?: boolean;
}

export interface UpdateServerData {
  id: number;
  city?: string;
  is_active?: boolean;
}

export interface UpdateServerResponse {
  success: boolean;
  message: string;
  data?: UpdateServerData;
}


//delete server

export interface DeleteServerResponse {
  success: boolean;
  message: string;
  data?: {
    server_id: number | string;
  };
}

