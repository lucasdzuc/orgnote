import { format, parseISO, addHours } from 'date-fns';
// import { zonedTimeToUtc, format } from 'date-fns-tz';
// import pt from 'date-fns/locale/pt-BR';

export default function formatDate(date: any){

  // const local = new Date(date);
  // local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  // const formDate = local.toJSON();

  const firstDate = parseISO(date);
  
  const formattedDate = format(firstDate, "dd/MM/yyyy HH:mm");
  // const firstDate = addHours(date, 0);

  // const formattedDate = format(firstDate, "dd/MM/yyyy HH:mm", {
  //   // locale: pt,
  //   timeZone: 'America/Sao_Paulo',
  // });
  // const formattedDate = 
  // return local.toJSON();

  return formattedDate;
}
