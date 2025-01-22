import express from 'express';
import mongoose from 'mongoose';
const app = express()
app.use(express.json());
import { v4 as uuidv4 } from 'uuid';

mongoose.connect('mongodb+srv://samdanielvr:<db_pass>@cluster0.tju41.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("MongoDBに接続しました！")
})

const expenseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    amount: { type: String, required: true },
});

const Expense = mongoose.model('Expense', expenseSchema);

app.get("/api/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOne({ id });
        if (!expense) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

app.post("/api/expenses", async (req, res) => {
    try {
        console.log(req.body);
        const { title, amount } = req.body;
        const newExpense = new Expense({
            id: uuidv4(),
            title,
            amount
        });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

app.delete("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const deletedExpense = await Expense.findOneAndDelete({ id });
        res.status(200).json({message: "Deleted Successfully"});
        if(!deletedExpense){
            res.status(404).json({message: "Not Found"});
            return;
        }
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
});

app.put("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const { title, amount } = req.body;
    try {
        const updatedExpense = await Expense.findOneAndUpdate({ 
            title, 
            amount 
        });
        if (!updatedExpense) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Serverがポチ3000に始めました！")
});
