import { Ionicons } from "@react-native-vector-icons/ionicons";


interface Props {
  name: string;
  size?: number;
  color?: string;
}

export const IonIcon = ({ name, size = 20, color = 'black' }: Props) => {
  return (
    <Ionicons name={name} color={color} size={size} />
  )
}
