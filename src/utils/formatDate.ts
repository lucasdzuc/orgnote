import { parseISO, addHours } from 'date-fns';
import { zonedTimeToUtc, format } from 'date-fns-tz';
// import pt from 'date-fns/locale/pt-BR';

export default function formatDate(date: any){

  // const firstDate = parseISO(date);
  // const formattedDate = format(firstDate, "dd/MM/yyyy' às 'HH:mm'");
  const firstDate = addHours(date, 0);
  
  const formattedDate = format(firstDate, "dd/MM/yyyy HH:mm", {
    // locale: pt,
    timeZone: 'America/Sao_Paulo',
  });

  return formattedDate;
}
