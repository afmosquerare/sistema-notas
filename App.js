import { StatusBar } from 'expo-status-bar';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Banner from './components/Banner';
import { Images } from './enums/images.enum';
import {useState} from 'react'
import { StudentReport } from './models/student.model';

export default function App() {
  
  class StudentReport{
    constructor(){
        this.identificacion = '';
        this.nombres = '';
        this.asignatura = '';
        this.nota1 = 0;
        this.nota2 = 0;
        this.nota3 = 0;
        this.notaDefinitiva = 0;
        this.observacion = '';
    }
  }

  const [allReports,setAllReports] = useState([]);

  const [nota1, setNota1] = useState({value:''})
  const [nota2, setNota2] = useState({value:''})
  const [nota3, setNota3] = useState({value:''})
  const [notaDefinitiva, setNotaDefinitiva] = useState({value:''})
  const [observacion, setObservacion] = useState({value:''})
  const [asignatura, setAsignatura] = useState({value:''})
  const [nombres, setNombres] = useState({value:''})
  const [identificacion, setIdentificacion] = useState({value:''})


  

  function saveProcess(){
    const report = new StudentReport();
    report.asignatura = asignatura.value;
    report.nombres = nombres.value;
    report.identificacion = identificacion.value;
    report.nota1 = Number(nota1.value.trim());
    report.nota2 = Number(nota2.value.trim());
    report.nota3 = Number(nota3.value.trim());
    report.notaDefinitiva = (Number(nota1.value)+Number(nota2.value)+Number(nota3.value))/3;
    report.observacion =report.notaDefinitiva < 2 ? 'Reprueba' : report.notaDefinitiva <= 2.94 ? 'Habilita' : 'Aprueba'

      if(allReports.length > 0){
        const hasReporte = allReports .find(r => r.identificacion === report.identificacion);
        if(!hasReporte){
          save(report);
        }
        else{
          alert('Ya se encuentra el reporte de este estudiante')
        }
      }
      else{
        save(report);
      
      }


    
  }

  function save(report){
    if(
      asignatura.value != ''&&
      identificacion.value != ''&&
      nombres.value  != ''&&
      nota1.value != ''&&
      nota2.value != ''&&
      nota3.value != ''
      ){
        setAllReports(reporst => reporst.concat(report));
        setNotaDefinitiva({value:report.notaDefinitiva})
        setObservacion({value:report.notaDefinitiva < 2 ? 'Reprueba' : report.notaDefinitiva <= 2.94 ? 'Habilita' : 'Aprueba'})
        alert('Reporte guardado')
      }
      else{
        alert('Faltan campos por diligenciar')
      }
  }

  

  function clear(){
    setIdentificacion({value:''})
    setAsignatura({value:''})
    setNombres({value:''})
    setObservacion({value:''})
    setNota1({value:''})
    setNota2({value:''})
    setNota3({value:''})
    setNotaDefinitiva({value:''})
  }

  function search(){
    if(identificacion.value.trim() != ''){
      if(allReports.length > 0){
        const hasReporte = allReports .find(r => r.identificacion === identificacion.value);
        if(!hasReporte){
          alert('No se encuentra el reporte de este estudiante')
        }
        else{
          setAsignatura({value:hasReporte.identificacion})
          setIdentificacion({value:hasReporte.identificacion})
          setNombres({value:hasReporte.nombres})
          setObservacion({value:hasReporte.observacion})
          setNota1({value:hasReporte.nota1})
          setNota2({value:hasReporte.nota2})
          setNota3({value:hasReporte.nota3})
          setNotaDefinitiva({value:hasReporte.notaDefinitiva})
          setObservacion({value:hasReporte.observacion})
        }
      }
      else{
        alert('El registro esta vacio')
      }
    }
    else{
      alert('La identificacion es requerida')
    }
  }
  
  
  
  return (
    <View style={[styles.container]}> 
    
      <View style={{ width:'100%', alignItems:'center' }}><Banner></Banner></View>
      <Text style={styles.title}>Sistema de notas</Text>


    <View style={styles.inputsContainer}>
    {identificacion.error && <Text style={{color:'red', fontSize:10}}>{identificacion.error}</Text>}
      <View>
    <Text style={styles.text}>Identificacion : </Text>
      </View>

    <TextInput 
    value={identificacion.value} 
    style={styles.input} 
    onChange= {e => {
      if (e.target.value.trim() === '') {
        setIdentificacion(() => ({ error: "Campo requerido.", value: '' }));
      } else {
        setIdentificacion({value: e.target.value})
      }
    }} 
    placeholder='Ingresa la identificacion'></TextInput>

    </View>


    <View style={styles.inputsContainer}>
    {nombres.error && <Text style={{color:'red', fontSize:10}}>{nombres.error}</Text>}
    <View>
    <Text style={styles.text}>Nombres : </Text>
    </View>

    <TextInput 
    value={nombres.value} 
    style={styles.input} 
    onChange={e => {
      if (e.target.value.trim() === '') {
        setNombres(() => ({ error: "Campo requerido.", value: '' }));
      } else {
        setNombres({value: e.target.value})
      }
    }} 
    placeholder='Ingresa nombres'></TextInput>

    </View>




    <View style={styles.inputsContainer}>
    {asignatura.error && <Text style={{color:'red', fontSize:10}}>{asignatura.error}</Text>}
    
    <View>
    <Text style={styles.text}>Asignatura : </Text>
    </View>

    <TextInput 
    value={asignatura.value} 
    style={styles.input} 
    onChange={e => {
      if (e.target.value.trim() === '') {
        setAsignatura(() => ({ error: "Campo requerido.", value: '' }));
      } else {
        setAsignatura({value: e.target.value})
      }
    }} 
    placeholder='Ingrese asignatura'></TextInput>

    </View>



    <View style={styles.inputsContainer}>
    
    <View>
    <Text style={styles.text}>Nota 1 : </Text>
    {nota1.error && <Text style={{color:'red', fontSize:10}}>{nota1.error}</Text>}
    </View>
    <TextInput 
    value={nota1.value} 
    style={styles.input} 
    onChange={e => {
      if (e.target.value.trim() === '') {
        setNota1(() => ({ error: "Campo requerido.", value: '' }));
      }
      else if(Number(e.target.value) > 5 || Number(e.target.value) < 0){
        setNota1({value: Number(e.target.value) > 5 ? '0' : '0'});
        alert('Los numeros deben ser mayores o iguales a 0 y menores o iguales a 5');
      }
      else {
        setNota1({value: e.target.value})
      }
    }} 
    placeholder='Ingrese la nota 1'
    maxLength={3}
    >

      
    </TextInput>

    </View>


    <View style={styles.inputsContainer}>
    
    {nota2.error && <Text style={{color:'red', fontSize:10}}>{nota2.error}</Text>}
    <View>
    <Text style={styles.text}>Nota 2 : </Text>
    </View>

    <TextInput 
    value={nota2.value} 
    style={styles.input} 
    onChange={e => {
      if (e.target.value.trim() === '') {
        setNota2(() => ({ error: "Campo requerido.", value: '' }));
      }
      else if(Number(e.target.value) > 5 || Number(e.target.value) < 0){
        setNota2({value: Number(e.target.value) > 5 ? '0' : '0'});
        alert('Los numeros deben ser mayores o iguales a 0 y menores o iguales a 5');
      }
      else {
        setNota2({value: e.target.value})
      }
    }} 
    placeholder='Ingrese la nota 2'
    maxLength={3}
    ></TextInput>

    </View>

    <View style={styles.inputsContainer}>
    {nota3.error && <Text style={{color:'red', fontSize:10}}>{nota3.error}</Text>}
    
    <View>
    <Text style={styles.text}>Nota 3 : </Text>
    </View>

    <TextInput 
    value={nota3.value} 
    style={styles.input} 
    onChange={e => {
      if (e.target.value.trim() === '') {
        setNota3(() => ({ error: "Campo requerido.", value: '' }));
      }
      else if(Number(e.target.value) > 5 || Number(e.target.value) < 0){
        setNota3({value: Number(e.target.value) > 5 ? '0' : '0'});
        alert('Los numeros deben ser mayores o iguales a 0 y menores o iguales a 5');
      }
      else {
        setNota3({value: e.target.value})
      }
    }} 
    placeholder='Ingrese la nota 3'
    maxLength={3}></TextInput>

    </View>

    <View style={styles.inputsContainer}>
    
    <Text style={styles.text}>Definitiva : </Text>

    <TextInput
    value={notaDefinitiva.value} 
    style={styles.input}
    editable={false}
    ></TextInput>

    </View>


    <View style={styles.inputsContainer}>
    
    <Text style={styles.text}>Observacion : </Text>

    <TextInput 
    value={observacion.value} 
    style={styles.input} 
    editable={false}
    ></TextInput>

    </View>

    

    <View style={{marginTop:'20px', flexDirection:'row', gap:'5px'}}>
    <button onClick={()=>{saveProcess()}
    }>Calcular / Guardar</button>
    <button onClick={()=>{clear()}}>Limpiar</button>
    <button onClick={()=>{search()}}>Buscar</button>

    </View>
  </View>
  );
  }
  

  const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'start  ',
    gap: 10 
    },
    banner: {
      width: 200,
      height: 200,
    },
    inputsContainer:{
      width: '90%', 
      flexDirection:'row',
      gap:'10px',
      alignItems: 'center',
      justifyContent:'space-between'
    },
    input:{
      width:'180px',
      height:'28px  ', 
      backgroundColor:'#f1f1f1', 
      color:'#000', 
      textAlign:'center'
    },
    text:{
      fontSize:16 ,  
      fontFamily: 'Verdana'
    },
    title: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
  });
