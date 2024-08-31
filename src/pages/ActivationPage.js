import { Card, CardHeader, CardBody, Button, CardFooter, Divider } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useGetOneRow from "../hooks/getOneRow";

const ActivationPage = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [refresh, setRefresh] = useState(false);
    const { data, error, loading } = useGetOneRow(`http://localhost:9000/activate-account/${token}`, refresh);
    if (token) {
        console.log(token);
    }
    const activateAccount = () => {
       setRefresh(true);
       if (error) {
        console.log(error);
       }
       if (data) {
        navigate('/login');
       }
    }
    return (
        <div>
        
                <div className="flex justify-center items-center min-h-screen mt-50">
                    <div className="w-full max-w-sm flex flex-col gap-6">
                        <Card className="pb-10">
                            <CardHeader className="flex gap-3">
                                <div>
                                    <h1 className="text-2xl font-bold">Activation compte</h1>
                                </div>
                            </CardHeader>
                            <CardBody>
                                {token ? (
                                    <>
                                        <div>
                                            <p>Veuillez cliquer sur le bouton ci-dessous pour activer votre compte.</p>
                                            <br />
                                            <Button onClick={activateAccount} color="success" className="mr-2 w-full btn-success" size="xs">Activer mon compte</Button>
                                        </div>
                    
                                    </>
                                ) : (
                                    <div>
                                           <div>
                                        <p>Nous avons envoyé un email d'activation. Veuillez vous connecter pour activer votre compte.</p>
                                        </div>
                                    </div>
                                )}
                            </CardBody>
                            <Divider />
                            <CardFooter>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
        </div>
    );

};

export default ActivationPage;