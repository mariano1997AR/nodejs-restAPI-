import { pool } from '../db.js';

export const getEmployees = async (req,res)=> {
    try{
        throw new Error('DB error');
        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows);     
    }catch(err){
             return res.status(500).json({
                 message:'Something goes wrong'
             })
    }
   
};

export const getEmployee = async (req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);
        if(rows.length <= 0){
            return res.status(404).json({message:'Employee not found'})
        };
        res.json(rows[0])      
    } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
  
}

//cualquier consulta a la base de datos es asincrona
export const createEmployees =  async (req,res) => {
    try {
        const {name,salary} = req.body;
        const [rows] =await pool.query('INSERT INTO employee (name,salary) VALUES (?,?)',[name,salary]);
        res.send({
           id:rows.insertId,
           name,
           salary,
        });    
    } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
    
};
export const deleteEmployees = async(req,res) => {
    try {
        const [result]  = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])
    
        if(result.affectedRows <= 0) return res.status(404).json({
            message:'Employee not found'
        })
    
        res.sendStatus(204); //todo fue bien pero no le respondemos nada al cliente     
    } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
   
};

export const updateEmployees = async(req,res) => {
    try {
        const {id} = req.params;
        const {name,salary} = req.body;
        //console.log(id,name,salary);
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?,name) , salary = IFNULL(?,salary) WHERE id = ?',[name,salary,id] );
        
        if(result.affectedRows === 0) return res.status(404).json({
            message:'Employee not found'
        })
    
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?',[id]);
    
        res.json(rows[0]);     
    } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
   
};
