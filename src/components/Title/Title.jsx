import { Clapperboard, User } from 'lucide-react';
import './Title.css';

export const Title = ({ text }) => {

  return (
    <h1 className="title">
      <Clapperboard strokeWidth={2} size={28}/>
      {text}
      </h1>
  )
}
