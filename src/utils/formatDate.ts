import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export default function formatDate(date: any){

  const firstDate = parseISO(date);

  // const formattedDate = format(firstDate, "dd/MM/yyyy' às 'HH:mm'");
  
  const formattedDate = format(firstDate, "dd 'de' MMMM 'de' yyyy', às 'HH:mm", {
    locale: pt,
  });

  return formattedDate;
}
