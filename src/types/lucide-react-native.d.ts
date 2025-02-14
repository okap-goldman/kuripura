import { LucideProps } from 'lucide-react-native';

declare module 'lucide-react-native' {
  export interface LucideProps {
    className?: string;
    fill?: string;
  }
}
