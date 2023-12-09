What I need to do
>Register:  
>>	-adaugare in baza de date: DONE  
>>	-verificare input: DONE  
>>	-basic U.I.: DONE  
>>	-hash parola: DONE  
>>	-good U.I.: DONE  
>>	-responive: DONE
>
>Login:  
>>	-verificare input: DONE  
>>	-cautare dupa mail: DONE  
>>	-basic U.I.: DONE  
>>	-output pentru input prost: DONE  
>>	-creare sesiune cu toke: DONE(without refresh token)  
>>	-cookies: NOT DOING IT  
>>	-good U.I.: DONE  
>>	-responive: DONE  
>
>Polls:  
>>	-adaugare in baza de date: DONE  
>>	-afisarea tuturor pollurilor in pagina principala: DONE  
>>	-verificare poll detinut de un user: DONE  
>>	-stergere poll: DONE  
>>	-votare la poll: DONE  
>>	-modificare poll doar de owner: NOT STARTED  
>>	-modificare raspuns: DONE  
>>	(doar pentru fara user)  
>>	-basic U.I.: DONE  
>>	-good U.I.: DONE  
>>	-responsive: DONE  
>
Starting Website
>Database START:  
>>	-systectl start mongod.service  
>
>Backend START: 
>>	-cd backend  
>>	-npm install  
>>  	-npm start  
>
>Frontend START  
>>	-cd frontend  
>> 	-npm install  
>> 	-npm start  
>
(Nu stiu daca este ok sa zic sau nu, sau sa modific DOAR README, dar prefer sa se stie)  
>Bugs Found After Deadline  
>>	-footer cand nu e niciun poll nu e jos de tot. Rezolvare: la css sa vad vad cu pozitia lui sa ma asigur ca se pune mereu jos de tot  
>> 	-poti alege vriante cand nu esti logat. Rezolvare: am uitat sa pun in poll_noUser la ambele tipuri de input un 'checked={false}'  
>>  	-daca faci vreo schimbare la vreun poll si imediat dai refresh la pagina, nu mai gaseste props.userId. Daca dai iar refresh isi revine. Rezolvare(idee): cumva, valoare de la token se poate sa se piarda sau sa fie luate de altcineva si nu mai este valabila cand incarci pagina sau ceva de genul. Undeva, 2 functii incearca sa foloseasca aceeasi valoare in acelasi timp.
>
